// plugins/antidelete.js
/**
 * Full Anti-Delete plugin for Baileys-based bots (compatible with your msg.js)
 */

const fs = require('fs')
const path = require('path')
const config = require('../settings/settings.json')
const { downloadMediaMessage } = require('../lib/msg') // your msg.js

const BASE_DIR = path.join(__dirname, '..', 'antidelete_store')
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true })

const DB_FILE = path.join(BASE_DIR, 'index.json')
const savedMessages = new Map()

/* ---------- DB ---------- */
function saveDB() {
  try {
    const arr = [...savedMessages.entries()]
    fs.writeFileSync(DB_FILE, JSON.stringify(arr, null, 2))
  } catch (e) {
    console.error('ANTIDELETE saveDB error:', e)
  }
}

function loadDB() {
  try {
    if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]')
    let raw = fs.readFileSync(DB_FILE, 'utf8').trim()
    if (!raw || raw === '' || raw === '{}' || raw === 'null') fs.writeFileSync(DB_FILE, '[]')

    let arr = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]')
    if (!Array.isArray(arr)) {
      if (typeof arr === 'object' && arr !== null) arr = Object.entries(arr)
      else arr = []
    }

    for (const [k, v] of arr) savedMessages.set(k, v)
  } catch (e) {
    console.error('ANTIDELETE loadDB error:', e)
  }
}
loadDB()

/* ---------- Helpers ---------- */
async function saveMediaMessageWrapper(conn, messageObj, key) {
  try {
    const filename = key?.id || Date.now()
    const media = await downloadMediaMessage({ type: Object.keys(messageObj)[0], msg: messageObj }, filename)
    if (!media) return null

    const filePath = path.join(BASE_DIR, filename)
    fs.writeFileSync(filePath, media)
    return { filePath, filename, mimetype: '' }
  } catch (e) {
    console.error('ANTIDELETE saveMediaMessage error:', e)
    return null
  }
}

async function resendSavedMessage(conn, saved, sendTo) {
  try {
    const timeMs = saved.timestamp && saved.timestamp.toString().length === 10 ? saved.timestamp * 1000 : saved.timestamp
    const captionPrefix = `🛡️ *Anti-Delete Recovery*\nFrom: ${saved.pushName || saved.from}\nTime: ${new Date(timeMs || Date.now()).toLocaleString()}\n\n`

    if (saved.type === 'text') return await conn.sendMessage(sendTo, { text: captionPrefix + (saved.text || '') })

    if (!saved.media || !saved.media.filePath || !fs.existsSync(saved.media.filePath))
      return await conn.sendMessage(sendTo, { text: captionPrefix + (saved.text || '[deleted media missing]') })

    const buffer = fs.readFileSync(saved.media.filePath)
    switch (saved.type) {
      case 'image':
        await conn.sendMessage(sendTo, { image: buffer, caption: captionPrefix + (saved.text || '') })
        break
      case 'video':
        await conn.sendMessage(sendTo, { video: buffer, caption: captionPrefix + (saved.text || '') })
        break
      case 'audio':
        await conn.sendMessage(sendTo, { audio: buffer, mimetype: 'audio/mpeg', ptt: false })
        break
      case 'sticker':
        await conn.sendMessage(sendTo, { sticker: buffer })
        break
      case 'document':
        await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename || 'file', mimetype: 'application/octet-stream', caption: captionPrefix + (saved.text || '') })
        break
      default:
        await conn.sendMessage(sendTo, { document: buffer, fileName: saved.media.filename || 'file', caption: captionPrefix + (saved.text || '') })
    }
  } catch (e) {
    console.error('ANTIDELETE resendSavedMessage error:', e)
  }
}

/* ---------- Core ---------- */
function initAntiDelete(conn) {
  if (!conn) throw new Error('initAntiDelete(conn) requires a Baileys conn object.')
  if (!config?.ANTI_DELETE) return console.log('ANTIDELETE disabled in settings.')
  if (conn._antidelete_inited) return console.log('ANTIDELETE already initialized.')
  conn._antidelete_inited = true
  console.log('ANTIDELETE: initializing listeners...')

  // Save incoming messages
  conn.ev.on('messages.upsert', async (mUpsert) => {
    try {
      if (!mUpsert || (mUpsert.type && mUpsert.type !== 'notify')) return
      const messages = mUpsert.messages || (Array.isArray(mUpsert) ? mUpsert : [])
      for (const msg of messages) {
        try {
          if (!msg?.message) continue
          const key = msg.key || {}
          const from = key.remoteJid || key.participant || key.id || 'unknown'
          const pushName = msg.pushName || msg.sender?.name || ''
          const timestamp = msg.messageTimestamp || key?.t || Date.now()

          let text = ''
          if (msg.message?.conversation) text = msg.message.conversation
          else if (msg.message?.extendedTextMessage?.text) text = msg.message.extendedTextMessage.text
          else if (msg.message?.imageMessage?.caption) text = msg.message.imageMessage.caption
          else if (msg.message?.videoMessage?.caption) text = msg.message.videoMessage.caption
          else if (msg.message?.documentMessage?.caption) text = msg.message.documentMessage.caption

          let type = 'text'
          if (msg.message.imageMessage) type = 'image'
          else if (msg.message.videoMessage) type = 'video'
          else if (msg.message.audioMessage) type = 'audio'
          else if (msg.message.stickerMessage) type = 'sticker'
          else if (msg.message.documentMessage) type = 'document'

          const saved = { key, pushName, from, timestamp, type, text, media: null }
          if (type !== 'text') saved.media = await saveMediaMessageWrapper(conn, msg.message, key)

          const mapKey = key?.id || `${from}_${timestamp}`
          savedMessages.set(mapKey, saved)
          saveDB()
        } catch (e) {
          console.error('ANTIDELETE inner save error:', e)
        }
      }
    } catch (e) {
      console.error('ANTIDELETE messages.upsert handler error:', e)
    }
  })

  // Detect deleted messages
  conn.ev.on('messages.update', async (updates) => {
    try {
      const arr = Array.isArray(updates) ? updates : [updates]
      for (const u of arr) {
        const proto = u?.message?.protocolMessage || u?.protocolMessage
        if (proto && typeof proto === 'object') {
          const delKey = proto.key || null
          if (delKey?.id) {
            const saved = savedMessages.get(`${delKey.id}`)
            if (saved) {
              const target = config.ANTI_DEL_PATH === 'inbox' ? (conn.user?.jid || saved.from) : saved.from
              await resendSavedMessage(conn, saved, target)
            }
          }
        }

        // Additional WhatsApp stub for deletion (e.g., messageStubType 68)
        if (u?.messageStubType === 68 && u?.key?.id) {
          const saved = savedMessages.get(`${u.key.id}`)
          if (saved) {
            const target = config.ANTI_DEL_PATH === 'inbox' ? (conn.user?.jid || saved.from) : saved.from
            await resendSavedMessage(conn, saved, target)
          }
        }
      }
    } catch (e) {
      console.error('ANTIDELETE messages.update handler error:', e)
    }
  })

  console.log('ANTIDELETE ready.')
}

module.exports = { initAntiDelete, savedMessages }
