// plugins/antidelete.js
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const config = require("../settings/settings.json");

let cache = new Map();
const MAX_CACHE = 3000;
const makeKey = (key) => `${key.remoteJid}|${key.id}`;

const startAntiDelete = (conn) => {
  if (!config.ANTI_DELETE) return console.log("❌ Anti-Delete is disabled in config.");

  // Cache incoming messages
  conn.ev.on('messages.upsert', async ({ messages }) => {
    for (let msg of messages) {
      if (!msg.message) continue;
      const key = makeKey(msg.key);
      cache.set(key, {
        key: msg.key,
        message: msg.message,
        participant: msg.key.participant || msg.pushName || "Unknown"
      });
      if (cache.size > MAX_CACHE) cache.delete(cache.keys().next().value);
    }
  });

  // Restore deleted messages
  conn.ev.on('messages.delete', async (deleted) => {
    const restore = async (del) => {
      try {
        const key = makeKey(del.key);
        const saved = cache.get(key);
        if (!saved) return;

        const jid = del.key.remoteJid;
        const msg = saved.message;
        const sender = saved.participant?.split("@")[0] || "unknown";

        await conn.sendMessage(jid, {
          text: `🛡️ *Anti-Delete Active*\n\n👤 Deleted by: @${sender}\n\n📩 Restoring message...`,
          mentions: [saved.participant]
        });

        let type = msg.imageMessage
          ? "image"
          : msg.videoMessage
            ? "video"
            : msg.audioMessage
              ? "audio"
              : msg.documentMessage
                ? "document"
                : msg.stickerMessage
                  ? "sticker"
                  : null;
        if (!type) return;

        const stream = await downloadContentFromMessage(msg[type + "Message"] ? msg[type + "Message"] : msg, type);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        await conn.sendMessage(jid, { [type]: buffer, caption: "🛡️ Restored (Anti-Delete)" });
      } catch (err) {
        console.log("AntiDelete Error:", err);
      }
    };

    if (Array.isArray(deleted)) {
      for (const d of deleted) await restore(d);
    } else {
      await restore(deleted);
    }
  });

  console.log("✅ Anti-Delete is active!");
};

module.exports = { startAntiDelete };
