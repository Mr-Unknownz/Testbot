// lib/msg.js
const { proto, downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys')
const fs = require('fs')
const path = require('path')

// Download media (image, video, audio, sticker, document, view-once)
const downloadMediaMessage = async (m, filename) => {
  try {
    let type = m.type
    let msg = m.msg

    // Handle view-once messages
    if (type === 'viewOnceMessage') {
      const innerType = getContentType(msg.message)
      msg = msg.message[innerType]
      type = innerType
    }

    let ext = ''
    let streamType = ''
    switch (type) {
      case 'imageMessage': ext = '.jpg'; streamType = 'image'; break
      case 'videoMessage': ext = '.mp4'; streamType = 'video'; break
      case 'audioMessage': ext = '.mp3'; streamType = 'audio'; break
      case 'stickerMessage': ext = '.webp'; streamType = 'sticker'; break
      case 'documentMessage':
        ext = path.extname(msg.fileName) || '.bin'
        streamType = 'document'
        break
      default: return null
    }

    const name = filename ? filename + ext : 'undefined' + ext
    const stream = await downloadContentFromMessage(msg, streamType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
    fs.writeFileSync(name, buffer)
    return fs.readFileSync(name)
  } catch (e) {
    console.error('downloadMediaMessage error:', e)
    return null
  }
}

// Wrapper
const sms = (conn, m) => {
  if (m.key) {
    m.id = m.key.id
    m.chat = m.key.remoteJid
    m.fromMe = m.key.fromMe
    m.isGroup = m.chat.endsWith('@g.us')
    m.sender = m.fromMe ? conn.user.id.split(':')[0] + '@s.whatsapp.net' : m.isGroup ? m.key.participant : m.chat
  }

  if (m.message) {
    m.type = getContentType(m.message)
    m.msg =
      m.type === 'viewOnceMessage'
        ? m.message[m.type].message[getContentType(m.message[m.type].message)]
        : m.message[m.type]

    if (m.msg && m.type === 'viewOnceMessage') m.msg.type = getContentType(m.message[m.type].message)

    // Body/caption
    m.body =
      m.type === 'conversation'
        ? m.msg
        : m.type === 'extendedTextMessage'
        ? m.msg.text
        : m.type === 'imageMessage' && m.msg.caption
        ? m.msg.caption
        : m.type === 'videoMessage' && m.msg.caption
        ? m.msg.caption
        : m.type === 'templateButtonReplyMessage' && m.msg.selectedId
        ? m.msg.selectedId
        : m.type === 'buttonsResponseMessage' && m.msg.selectedButtonId
        ? m.msg.selectedButtonId
        : ''

    // Quoted
    m.quoted = m.msg.contextInfo?.quotedMessage || null
    if (m.quoted) {
      m.quoted.type = getContentType(m.quoted)
      m.quoted.id = m.msg.contextInfo.stanzaId
      m.quoted.sender = m.msg.contextInfo.participant
      m.quoted.fromMe = m.quoted.sender.split('@')[0].includes(conn.user.id.split(':')[0])
      m.quoted.msg =
        m.quoted.type === 'viewOnceMessage'
          ? m.quoted[m.quoted.type].message[getContentType(m.quoted[m.quoted.type].message)]
          : m.quoted[m.quoted.type]

      if (m.quoted.type === 'viewOnceMessage') m.quoted.msg.type = getContentType(m.quoted[m.quoted.type].message)

      // Quoted mentions
      const qMent = m.quoted.msg.contextInfo
      const tagMention = qMent?.mentionedJid
      const quotedMention = qMent?.participant
      let mentions = []
      if (tagMention) mentions = typeof tagMention === 'string' ? [tagMention] : tagMention
      if (quotedMention) mentions.push(quotedMention)
      m.quoted.mentionUser = mentions.filter((x) => x)

      m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
        key: {
          remoteJid: m.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
          participant: m.quoted.sender,
        },
        message: m.quoted,
      })

      // Quoted actions
      m.quoted.download = (filename) => downloadMediaMessage(m.quoted, filename)
      m.quoted.delete = () => conn.sendMessage(m.chat, { delete: m.quoted.fakeObj.key })
      m.quoted.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.quoted.fakeObj.key } })
    }

    // Direct actions
    m.download = (filename) => downloadMediaMessage(m, filename)
  }

  // Reply helpers
  m.reply = (teks, id = m.chat, option = { mentions: [m.sender] }) =>
    conn.sendMessage(id, { text: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
  m.replyS = (stik, id = m.chat, option = { mentions: [m.sender] }) =>
    conn.sendMessage(id, { sticker: stik, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
  m.replyImg = (img, teks, id = m.chat, option = { mentions: [m.sender] }) =>
    conn.sendMessage(id, { image: img, caption: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
  m.replyVid = (vid, teks, id = m.chat, option = { mentions: [m.sender], gif: false }) =>
    conn.sendMessage(id, { video: vid, caption: teks, gifPlayback: option.gif, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
  m.replyAud = (aud, id = m.chat, option = { mentions: [m.sender], ptt: false }) =>
    conn.sendMessage(id, { audio: aud, ptt: option.ptt, mimetype: 'audio/mpeg', contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
  m.replyDoc = (doc, id = m.chat, option = { mentions: [m.sender], filename: 'undefined.pdf', mimetype: 'application/pdf' }) =>
    conn.sendMessage(id, { document: doc, mimetype: option.mimetype, fileName: option.filename, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
  m.replyContact = (name, info, number) => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${info};\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`
    conn.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: m })
  }

  m.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } })

  return m
}

module.exports = { sms, downloadMediaMessage }
