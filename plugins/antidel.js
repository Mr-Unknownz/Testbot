const { cmd } = require('../lib/command')
const { downloadContentFromMessage } = require('@whiskeysockets/baileys')

let cache = new Map()
const MAX_CACHE = 2000

const keyId = (k) => `${k.remoteJid}|${k.id}`

// 🔥 Start caching messages globally
module.exports = (conn) => {

    conn.ev.on('messages.upsert', async ({ messages }) => {
        for (let msg of messages) {
            if (!msg.message) continue
            cache.set(keyId(msg.key), {
                key: msg.key,
                message: msg.message,
                sender: msg.pushName || msg.key.participant || "Unknown"
            })

            if (cache.size > MAX_CACHE) {
                cache.delete(cache.keys().next().value)
            }
        }
    })

    conn.ev.on('messages.delete', async (deleted) => {

        async function restore(del) {
            const saved = cache.get(keyId(del.key))
            if (!saved) return

            const jid = del.key.remoteJid
            const msg = saved.message

            await conn.sendMessage(jid, {
                text: `🛡️ *Anti-Delete Triggered*\n👤 Deleted by: @${saved.sender}\n\n📨 Restoring...`,
                mentions: [del.key.participant]
            })

            // TEXT
            if (msg.conversation || msg?.extendedTextMessage?.text) {
                return conn.sendMessage(jid, {
                    text: msg.conversation || msg.extendedTextMessage.text
                })
            }

            // MEDIA
            let type =
                msg.imageMessage ? "image" :
                msg.videoMessage ? "video" :
                msg.audioMessage ? "audio" :
                msg.documentMessage ? "document" :
                msg.stickerMessage ? "sticker" :
                null

            if (!type) return

            const stream = await downloadContentFromMessage(msg[type + "Message"], type)
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }

            await conn.sendMessage(jid, {
                [type]: buffer,
                caption: "🛡 Restored Message"
            })
        }

        if (Array.isArray(deleted)) {
            for (let d of deleted) await restore(d)
        } else {
            await restore(deleted)
        }
    })

    console.log("🛡 Anti-Delete GLOBAL Listener Loaded")
}
