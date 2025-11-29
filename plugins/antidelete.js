// plugins/antidelete.js
/**
 * Anti-Delete plugin for Baileys v5
 * Works with downloadContentFromMessage
 */

const fs = require('fs');
const path = require('path');
const config = require('../settings/settings.json');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

const BASE_DIR = path.join(__dirname, '..', 'antidelete_store');
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

const DB_FILE = path.join(BASE_DIR, 'index.json');
const savedMessages = new Map();

// ---------- DB ---------- //
function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify([...savedMessages.entries()], null, 2));
  } catch (e) {
    console.error('ANTIDELETE saveDB error:', e);
  }
}

function loadDB() {
  try {
    if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
    const arr = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]');
    for (const [k, v] of arr) savedMessages.set(k, v);
  } catch (e) {
    console.error('ANTIDELETE loadDB error:', e);
  }
}
loadDB();

// ---------- Helpers ---------- //
async function downloadMedia(msg, filename) {
  try {
    const type = Object.keys(msg)[0];
    const stream = await downloadContentFromMessage(msg[type], type.replace('Message', ''));
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    const filePath = path.join(BASE_DIR, filename);
    fs.writeFileSync(filePath, buffer);
    return { buffer, filePath };
  } catch (e) {
    console.error('downloadMedia error:', e);
    return null;
  }
}

async function resendSaved(conn, saved, sendTo) {
  try {
    const timeMs = saved.timestamp && saved.timestamp.toString().length === 10 ? saved.timestamp * 1000 : saved.timestamp;
    const prefix = `🛡️ *Anti-Delete*\nFrom: ${saved.pushName || saved.from}\nTime: ${new Date(timeMs).toLocaleString()}\n\n`;

    if (saved.type === 'text') return conn.sendMessage(sendTo, { text: prefix + (saved.text || '') });

    if (!saved.media || !fs.existsSync(saved.media.filePath))
      return conn.sendMessage(sendTo, { text: prefix + (saved.text || '[deleted media missing]') });

    const buffer = fs.readFileSync(saved.media.filePath);

    switch (saved.type) {
      case 'image': await conn.sendMessage(sendTo, { image: buffer, caption: prefix + (saved.text || '') }); break;
      case 'video': await conn.sendMessage(sendTo, { video: buffer, caption: prefix + (saved.text || '') }); break;
      case 'audio': await conn.sendMessage(sendTo, { audio: buffer, mimetype: 'audio/mpeg', ptt: false }); break;
      case 'sticker': await conn.sendMessage(sendTo, { sticker: buffer }); break;
      case 'document':
        await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename || 'file', mimetype: 'application/octet-stream', caption: prefix + (saved.text || '') });
        break;
      default:
        await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename || 'file', caption: prefix + (saved.text || '') });
    }
  } catch (e) {
    console.error('resendSaved error:', e);
  }
}

// ---------- Core ---------- //
function initAntiDelete(conn) {
  if (!conn) throw new Error('initAntiDelete(conn) requires Baileys conn object.');
  if (!config?.ANTI_DELETE) return console.log('ANTIDELETE disabled.');
  if (conn._antidelete_inited) return console.log('ANTIDELETE already initialized.');
  conn._antidelete_inited = true;

  console.log('ANTIDELETE: initializing...');

  // Save incoming messages
  conn.ev.on('messages.upsert', async (upsert) => {
    const msgs = upsert.messages || [];
    for (const msg of msgs) {
      try {
        if (!msg?.message) continue;

        const key = msg.key || {};
        const from = key.remoteJid || key.participant || key.id || 'unknown';
        const pushName = msg.pushName || msg.sender?.name || '';
        const timestamp = msg.messageTimestamp || key?.t || Date.now();

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
        if (type !== 'text') {
          const filename = key?.id || `${from}_${timestamp}`;
          saved.media = await downloadMedia(msg.message, filename);
          saved.media.filename = filename;
        }

        const mapKey = key?.id || `${from}_${timestamp}`;
        savedMessages.set(mapKey, saved);
        fs.writeFileSync(DB_FILE, JSON.stringify([...savedMessages.entries()], null, 2));
      } catch (e) {
        console.error('ANTIDELETE save message error:', e);
      }
    }
  });

  // Detect deleted messages
  conn.ev.on('messages.update', async (updates) => {
    for (const u of updates) {
      const protoMsg = u?.message?.protocolMessage || u?.protocolMessage;
      if (protoMsg?.key?.id) {
        const saved = savedMessages.get(protoMsg.key.id);
        if (saved) {
          const target = config.ANTI_DEL_PATH === 'inbox' ? (conn.user?.jid || saved.from) : saved.from;
          await resendSaved(conn, saved, target);
        }
      }
      if (u?.messageStubType === 68 && u?.key?.id) {
        const saved = savedMessages.get(u.key.id);
        if (saved) {
          const target = config.ANTI_DEL_PATH === 'inbox' ? (conn.user?.jid || saved.from) : saved.from;
          await resendSaved(conn, saved, target);
        }
      }
    }
  });

  console.log('ANTIDELETE ready.');
}

module.exports = { initAntiDelete, savedMessages };
