// plugins/antidelete.js
const { cmd } = require('../lib/command');
const fs = require('fs');
const path = require('path');

const config = require('../settings/settings.json'); // ඔයාගේ config path
// Ensure folder to store recovered media
const BASE_DIR = path.join(__dirname, '..', 'antidelete_store');
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

// In-memory cache mapping msgId -> saved object
// Saved object: { key, pushName, from, timestamp, type, text, filename, mimetype, filePath (if media) }
const savedMessages = new Map();

// Small helper to save JSON file (persistent backup)
const DB_FILE = path.join(BASE_DIR, 'index.json');
function saveDB() {
  try { fs.writeFileSync(DB_FILE, JSON.stringify([...savedMessages.entries()], null, 2)) } catch(e){console.error(e)}
}
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const arr = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      for (const [k,v] of arr) savedMessages.set(k,v);
    }
  } catch(e){ console.error(e) }
}
loadDB();

/**
 * register a startup plugin so when module loads we attach event listeners to the connection object.
 * We assume the bot's main connection object is available as `conn` passed by the `cmd` loader.
 * If your framework exposes it differently, adapt accordingly.
 */
cmd({
  pattern: 'antidelete-startup',
  react: '🛡️',
  desc: 'Auto-register antidelete listeners (runs on load).',
  category: 'system',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  // Only run init once
  if (conn.antidelete_inited) return reply('Antidelete already initialized.');
  conn.antidelete_inited = true;

  // helper: download media to disk and return { filePath, filename, mimetype }
  async function saveMediaMessage(message, key) {
    try {
      const msg = message;
      // If message contains media content, find its mimetype and stream
      const mtype = Object.keys(msg).find(k => ['imageMessage','videoMessage','audioMessage','stickerMessage','documentMessage'].includes(k));
      if (!mtype) return null;

      const mediaContent = msg[mtype];
      const mime = mediaContent.mimetype || (mtype === 'imageMessage' ? 'image/jpeg' : '');
      const ext = mime.split('/')[1] || (mtype === 'imageMessage' ? 'jpg' : 'bin');
      const filename = `${key.id || Date.now()}.${ext}`;
      const filePath = path.join(BASE_DIR, filename);

      // Use conn.downloadMediaMessage when available (Baileys v4+)
      if (conn.downloadMediaMessage) {
        const buffer = await conn.downloadMediaMessage({ message: msg, type: mtype.replace('Message','') });
        fs.writeFileSync(filePath, buffer);
        return { filePath, filename, mimetype: mime };
      }

      // Fallback: if message has direct buffer field
      if (mediaContent._buf) {
        fs.writeFileSync(filePath, mediaContent._buf);
        return { filePath, filename, mimetype: mime };
      }

      return null;
    } catch (e) {
      console.error('saveMediaMessage error', e);
      return null;
    }
  }

  // When a new message arrives -> save it to memory/disk
  conn.ev.on && conn.ev.on('messages.upsert', async (mUpsert) => {
    try {
      if (!config.ANTI_DELETE) return;
      if (mUpsert.type !== 'notify') return; // only incoming notifications

      for (const msg of mUpsert.messages) {
        if (!msg.message) continue; // ignore system stubs
        const key = msg.key;
        // don't save status broadcast messages or our own outgoing messages (optional)
        // if (key.fromMe) continue;

        const pushName = (msg.pushName || (msg.message && msg.message.senderKeyDistributionMessage && msg.message.senderKeyDistributionMessage.sender) || '') ;
        const from = key.remoteJid || key.participant || key.id || 'unknown';
        const timestamp = msg.messageTimestamp || (msg.key && msg.key.t) || Date.now();

        // Extract text/caption if exists
        let text = '';
        if (msg.message.conversation) text = msg.message.conversation;
        else if (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text) text = msg.message.extendedTextMessage.text;
        else if (msg.message.imageMessage && msg.message.imageMessage.caption) text = msg.message.imageMessage.caption;
        else if (msg.message.videoMessage && msg.message.videoMessage.caption) text = msg.message.videoMessage.caption;
        else if (msg.message.documentMessage && msg.message.documentMessage.caption) text = msg.message.documentMessage.caption;

        // Determine type
        let type = 'text';
        if (msg.message.imageMessage) type = 'image';
        else if (msg.message.videoMessage) type = 'video';
        else if (msg.message.audioMessage) type = 'audio';
        else if (msg.message.stickerMessage) type = 'sticker';
        else if (msg.message.documentMessage) type = 'document';

        const saved = {
          key,
          pushName,
          from,
          timestamp,
          type,
          text,
          media: null
        };

        // If media -> save to disk
        if (type !== 'text') {
          const mediaInfo = await saveMediaMessage(msg.message, key);
          if (mediaInfo) saved.media = mediaInfo;
        }

        // store using message id as key (use key.id or composite)
        const mapKey = (key && key.id) ? `${key.id}` : `${from}_${timestamp}`;
        savedMessages.set(mapKey, saved);
        saveDB();
      }
    } catch (e) {
      console.error('antidelete store error', e);
    }
  });

  /**
   * Detect deletes:
   * Many Baileys versions send a protocolMessage when someone revokes a message.
   * We attempt to catch protocolMessage deletions via messages.upsert or messages.update.
   * If your Baileys version emits an event with the deleted message id(s), adapt the check below.
   */
  conn.ev.on && conn.ev.on('messages.update', async (updates) => {
    try {
      if (!config.ANTI_DELETE) return;

      // updates can be an array of update objects or single
      const arr = Array.isArray(updates) ? updates : [updates];
      for (const u of arr) {
        // Many bots see a protocolMessage when delete occurs:
        // u.message?.protocolMessage?.type === 0 or u.update?.messageStubType === 68
        // We'll check a few possibilities:

        // Option A: protocolMessage payload (common)
        const proto = u.message && u.message.protocolMessage ? u.message.protocolMessage : null;
        if (proto && (proto.type === 0 || proto.type === 3 || proto.type === 5)) {
          // proto.key contains the deleted message key usually
          const delKey = proto.key;
          if (delKey && delKey.id) {
            const mapKey = `${delKey.id}`;
            const saved = savedMessages.get(mapKey);
            if (saved) {
              // send recovered message according to config.ANTI_DEL_PATH
              const target = (config.ANTI_DEL_PATH === 'inbox') ? (conn.user && conn.user.jid ? conn.user.jid : 'status@broadcast') : saved.from;
              await resendSavedMessage(conn, saved, target);
              // optional: remove from savedMessages if you don't want duplicates later
              // savedMessages.delete(mapKey); saveDB();
            }
          }
        }

        // Option B: some versions provide messageStubType (68 = deleted message)
        if (u.messageStubType === 68 && u.key && u.key.id) {
          const mapKey = `${u.key.id}`;
          const saved = savedMessages.get(mapKey);
          if (saved) {
            const target = (config.ANTI_DEL_PATH === 'inbox') ? (conn.user && conn.user.jid ? conn.user.jid : 'status@broadcast') : saved.from;
            await resendSavedMessage(conn, saved, target);
          }
        }
      }
    } catch (e) {
      console.error('antidelete detect error', e);
    }
  });

  // helper to resend saved message back to chat (or inbox)
  async function resendSavedMessage(conn, saved, sendTo) {
    try {
      const captionPrefix = `🛡️ *Anti-Delete Recovery*\nFrom: ${saved.pushName || saved.from}\nTime: ${new Date(saved.timestamp * 1000 || saved.timestamp).toLocaleString()}\n\n`;

      if (saved.type === 'text') {
        await conn.sendMessage(sendTo, { text: captionPrefix + saved.text });
      } else if (saved.media && fs.existsSync(saved.media.filePath)) {
        const buffer = fs.readFileSync(saved.media.filePath);
        if (saved.type === 'image') {
          await conn.sendMessage(sendTo, { image: buffer, caption: captionPrefix + (saved.text || '') });
        } else if (saved.type === 'video') {
          await conn.sendMessage(sendTo, { video: buffer, caption: captionPrefix + (saved.text || '') });
        } else if (saved.type === 'audio') {
          await conn.sendMessage(sendTo, { audio: buffer, mimetype: saved.media.mimetype, ptt: false });
        } else if (saved.type === 'sticker') {
          await conn.sendMessage(sendTo, { sticker: buffer });
        } else if (saved.type === 'document') {
          await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename, mimetype: saved.media.mimetype, caption: captionPrefix + (saved.text || '') });
        } else {
          // fallback to sending as document
          await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename || 'file.bin', caption: captionPrefix + (saved.text || '') });
        }
      } else {
        // no media file present, just send text recovery (if text exists)
        await conn.sendMessage(sendTo, { text: captionPrefix + (saved.text || '[deleted message - media missing]') });
      }
    } catch (e) {
      console.error('resendSavedMessage error', e);
    }
  }

  // small reply to show plugin registered
  reply('Anti-delete system initialized. config.ANTI_DELETE=' + !!config.ANTI_DELETE);
});
