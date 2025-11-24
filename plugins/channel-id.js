const { cmd } = require("../lib/command");
const config = require('../settings/settings.json');

cmd({
  pattern: "cid",
  alias: ["newsletter", "id"],
  react: "📡",
  desc: "Get WhatsApp Channel info from link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {

  try {
    if (!q) return reply("*❎ Please provide a WhatsApp Channel link.*\n\nExample: .cid https://whatsapp.com/channel/123456789");

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) return reply("⚠️ *Invalid channel link.*\nCorrect format:\nhttps://whatsapp.com/channel/xxxxxxxxx");

    const inviteId = match[1];

    let metadata;
    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch (e) {
      return reply("> ❌ *Failed to fetch channel metadata.*");
    }

    if (!metadata || !metadata.id) return reply("❌ Channel not found or inaccessible.");

    const infoText = `*— 乂 < | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 𝐂ʜᴀɴɴᴇʟ 𝐈ɴꜰᴏ —*\n
🆔 *ID:* ${metadata.id}
📌 *Name:* ${metadata.name}
👥 *Followers:* ${metadata.subscribers?.toLocaleString() || "N/A"}
📅 *Created On:* ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString("id-ID") : "Unknown"}

${config.FOOTER}`;

    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText
      }, { quoted: m });
    } else {
      await reply(infoText);
    }

  } catch (error) {
    console.error("❌ Error in .cid command:", error);
    reply("⚠️ *Unexpected error occurred.*");
  }

});
