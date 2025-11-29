const fs = require('fs');
const path = require('path');

const config = require('../settings/settings.json'); // config path

// Folder to save recovered media + DB
const BASE_DIR = path.join(__dirname, '..', 'antidelete_store');
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

// In-memory cache
const savedMessages = new Map();

// Persistent DB file
const DB_FILE = path.join(BASE_DIR, 'index.json');
function saveDB() {
  try { fs.writeFileSync(DB_FILE, JSON.stringify([...savedMessages.entries()], null, 2)) } catch(e){ console.error(e) }
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
 * Auto-init anti-delete
 * conn -> your Baileys bot connection object
 */
function initAntiDelete(conn) {
  if (!config.ANTI_DELETE) return;
  if (conn.antidelete_inited) return; // already initialized
  conn.antidelete_inited = true;

  console.log('🛡️ Anti-delete system initialized!');

  // Save new messages
  conn.ev.on('messages.upsert', async (mUpsert) => {
    try {
      if (mUpsert.type !== 'notify') return;
      for (const msg of mUpsert.messages) {
        if (!msg.message) continue;

        const key = msg.key;
        const from = key.remoteJid || key.participant || key.id || 'unknown';
        const pushName = msg.pushName || '';
        const timestamp = msg.messageTimestamp || (key.t) || Date.now();

        // extract text/caption
        let text = '';
        if (msg.message.conversation) text = msg.message.conversation;
        else if (msg.message.extendedTextMessage?.text) text = msg.message.extendedTextMessage.text;
        else if (msg.message.imageMessage?.caption) text = msg.message.imageMessage.caption;
        else if (msg.message.videoMessage?.caption) text = msg.message.videoMessage.caption;
        else if (msg.message.documentMessage?.caption) text = msg.message.documentMessage.caption;

        let type = 'text';
        if (msg.message.imageMessage) type = 'image';
        else if (msg.message.videoMessage) type = 'video';
        else if (msg.message.audioMessage) type = 'audio';
        else if (msg.message.stickerMessage) type = 'sticker';
        else if (msg.message.documentMessage) type = 'document';

        const saved = { key, pushName, from, timestamp, type, text, media: null };

        // save media if exists
        if (type !== 'text') {
          const mediaInfo = await saveMediaMessage(conn, msg.message, key);
          if (mediaInfo) saved.media = mediaInfo;
        }

        const mapKey = key.id || `${from}_${timestamp}`;
        savedMessages.set(mapKey, saved);
        saveDB();
      }
    } catch(e){ console.error('antidelete save error', e) }
  });

  // Detect deleted messages
  conn.ev.on('messages.update', async (updates) => {
    try {
      const arr = Array.isArray(updates) ? updates : [updates];
      for (const u of arr) {
        const proto = u.message?.protocolMessage;
        if (proto && [0,3,5].includes(proto.type)) {
          const delKey = proto.key;
          if (delKey?.id) {
            const mapKey = delKey.id;
            const saved = savedMessages.get(mapKey);
            if (saved) {
              const target = (config.ANTI_DEL_PATH === 'inbox') ? conn.user?.jid : saved.from;
              await resendSavedMessage(conn, saved, target);
            }
          }
        }
        if (u.messageStubType === 68 && u.key?.id) {
          const saved = savedMessages.get(u.key.id);
          if (saved) {
            const target = (config.ANTI_DEL_PATH === 'inbox') ? conn.user?.jid : saved.from;
            await resendSavedMessage(conn, saved, target);
          }
        }
      }
    } catch(e){ console.error('antidelete recover error', e) }
  });
}

// Helper to save media to disk
async function saveMediaMessage(conn, message, key) {
  try {
    const mtype = Object.keys(message).find(k => ['imageMessage','videoMessage','audioMessage','stickerMessage','documentMessage'].includes(k));
    if (!mtype) return null;

    const media = message[mtype];
    const mime = media.mimetype || (mtype==='imageMessage'?'image/jpeg':'');
    const ext = mime.split('/')[1] || 'bin';
    const filename = `${key.id || Date.now()}.${ext}`;
    const filePath = path.join(BASE_DIR, filename);

    if (conn.downloadMediaMessage) {
      const buffer = await conn.downloadMediaMessage({ message, type: mtype.replace('Message','') });
      fs.writeFileSync(filePath, buffer);
      return { filePath, filename, mimetype: mime };
    }
    return null;
  } catch(e){ console.error('saveMediaMessage error', e); return null; }
}

// Helper to resend message
async function resendSavedMessage(conn, saved, sendTo) {
  try {
    const captionPrefix = `🛡️ *Anti-Delete Recovery*\nFrom: ${saved.pushName}\nTime: ${new Date(saved.timestamp*1000||saved.timestamp).toLocaleString()}\n\n`;

    if (saved.type === 'text') {
      await conn.sendMessage(sendTo, { text: captionPrefix + saved.text });
    } else if (saved.media && fs.existsSync(saved.media.filePath)) {
      const buffer = fs.readFileSync(saved.media.filePath);
      if (saved.type === 'image') await conn.sendMessage(sendTo, { image: buffer, caption: captionPrefix + (saved.text||'') });
      else if (saved.type === 'video') await conn.sendMessage(sendTo, { video: buffer, caption: captionPrefix + (saved.text||'') });
      else if (saved.type === 'audio') await conn.sendMessage(sendTo, { audio: buffer, mimetype: saved.media.mimetype, ptt: false });
      else if (saved.type === 'sticker') await conn.sendMessage(sendTo, { sticker: buffer });
      else if (saved.type === 'document') await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename, mimetype: saved.media.mimetype, caption: captionPrefix + (saved.text||'') });
      else await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename||'file.bin', caption: captionPrefix + (saved.text||'') });
    } else {
      await conn.sendMessage(sendTo, { text: captionPrefix + (saved.text || '[deleted message - media missing]') });
    }
  } catch(e){ console.error('resendSavedMessage error', e); }
}

// Export
module.exports = { initAntiDelete };
