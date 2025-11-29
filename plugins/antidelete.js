const fs = require('fs');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const config = require('../settings/settings.json');

const BASE_DIR = path.join(__dirname, '..', 'antidelete_store');
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

const savedMessages = new Map();

const ANTI_DEL_PATH = config.ANTI_DEL_PATH || 'inbox';

async function saveMediaMessageWrapper(msg, filename) {
  try {
    if (!msg) throw new Error('Empty message');
    const mtype = msg.mtype || Object.keys(msg)[0];

    if (!['imageMessage','videoMessage','audioMessage','stickerMessage','documentMessage'].includes(mtype))
      return null;

    // download media
    const stream = await downloadContentFromMessage(msg[mtype], mtype.replace('Message',''));
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    const extMap = {
      imageMessage: '.jpg',
      videoMessage: '.mp4',
      audioMessage: '.mp3',
      stickerMessage: '.webp',
      documentMessage: msg[mtype]?.fileName ? '.' + msg[mtype].fileName.split('.').pop() : '.bin'
    };
    const ext = extMap[mtype] || '.bin';
    const filePath = path.join(BASE_DIR, (filename || Date.now()) + ext);

    fs.writeFileSync(filePath, buffer);
    return { filePath, filename: path.basename(filePath) };

  } catch (e) {
    console.error('saveMediaMessageWrapper error:', e.message);
    return null; // fail safe
  }
}

async function resendSavedMessage(conn, saved, to) {
  try {
    const prefix = `🛡️ Anti-Delete Recovery\nFrom: ${saved.pushName || saved.from}\nTime: ${new Date(saved.timestamp || Date.now()).toLocaleString()}\n\n`;
    if (saved.type === 'text') return await conn.sendMessage(to, { text: prefix + saved.text });
    if (!saved.media || !fs.existsSync(saved.media.filePath)) return await conn.sendMessage(to, { text: prefix + (saved.text || '[deleted media]') });

    const buffer = fs.readFileSync(saved.media.filePath);
    switch(saved.type){
      case 'image': await conn.sendMessage(to, { image: buffer, caption: prefix + (saved.text||'') }); break;
      case 'video': await conn.sendMessage(to, { video: buffer, caption: prefix + (saved.text||'') }); break;
      case 'audio': await conn.sendMessage(to, { audio: buffer, mimetype:'audio/mpeg', ptt:false }); break;
      case 'sticker': await conn.sendMessage(to, { sticker: buffer }); break;
      case 'document': await conn.sendMessage(to, { document: buffer, fileName: saved.media.filename, caption: prefix + (saved.text||'') }); break;
      default: await conn.sendMessage(to, { document: buffer, fileName: saved.media.filename || 'file', caption: prefix + (saved.text||'') });
    }
  } catch(e) { console.error('resendSavedMessage error:', e); }
}

function initAntiDelete(conn){
  if(conn._antidelete_inited) return;
  conn._antidelete_inited = true;

  conn.ev.on('messages.upsert', async mUpsert => {
    for(const msg of (mUpsert.messages || [])){
      try{
        if(!msg.message) continue;
        const key = msg.key;
        const from = key.remoteJid || key.participant || key.id || 'unknown';
        const timestamp = msg.messageTimestamp || Date.now();

        let type = 'text';
        if(msg.message.imageMessage) type='image';
        else if(msg.message.videoMessage) type='video';
        else if(msg.message.audioMessage) type='audio';
        else if(msg.message.stickerMessage) type='sticker';
        else if(msg.message.documentMessage) type='document';

        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || '';
        let media = null;
        if(type !== 'text') media = await saveMediaMessageWrapper(msg.message, key.id);

        savedMessages.set(key.id, { key, from, timestamp, pushName: msg.pushName, type, text, media });
      }catch(e){ console.error('AntiDelete save error:', e); }
    }
  });

  conn.ev.on('messages.update', async updates => {
    for(const u of (Array.isArray(updates)?updates:[updates])){
      const proto = u?.message?.protocolMessage || u?.protocolMessage;
      if(proto && proto.key?.id){
        const saved = savedMessages.get(proto.key.id);
        if(saved){
          const target = (ANTI_DEL_PATH==='inbox')?conn.user?.id:saved.from;
          await resendSavedMessage(conn, saved, target);
        }
      }
    }
  });

  console.log('ANTIDELETE ready');
}

module.exports = { initAntiDelete, savedMessages };
