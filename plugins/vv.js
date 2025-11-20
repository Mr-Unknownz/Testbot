const { cmd } = require("../lib/command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const config = require("../settings");

const ANTI_VV = config.ANTI_VV || 'inbox';

cmd({
  pattern: "vv",
  alias: ["viewonce", "❤️"],
  react: "🐳",
  desc: "Owner Only - retrieve quoted media back to user",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a view-once or media message!*"
      }, { quoted: message });
    }

    const quoted = match.quoted.ephemeralMessage?.message || match.quoted;
    const mtype = quoted.mtype || Object.keys(quoted)[0];

    if (!["imageMessage", "videoMessage", "audioMessage"].includes(mtype)) {
      return await client.sendMessage(from, {
        text: "❌ Only image, video, and audio messages are supported"
      }, { quoted: message });
    }

    // Download media
    const stream = await downloadContentFromMessage(quoted[mtype], mtype.replace("Message", ""));
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    // Prepare media message
    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = { image: buffer, mimetype: quoted[mtype]?.mimetype || "image/jpeg" };
        break;
      case "videoMessage":
        messageContent = { video: buffer, mimetype: quoted[mtype]?.mimetype || "video/mp4" };
        break;
      case "audioMessage":
        messageContent = { audio: buffer, mimetype: quoted[mtype]?.mimetype || "audio/mp4", ptt: quoted[mtype]?.ptt || false };
        break;
    }

    // Fancy caption
    let captionText = quoted[mtype]?.caption ? `*🧾 𝐂ᴀᴘᴛɪᴏɴ :* ${quoted[mtype].caption}\n\n` : "";

    if (message.key.remoteJid.endsWith("@g.us")) {
  const groupJid = message.key.remoteJid;

  // Get metadata
  const groupMetadata = await client.groupMetadata(groupJid).catch(() => null);
  const groupName = groupMetadata?.subject || groupJid.split("@")[0];

  // Sender
  const senderNumber = message.key.participant?.split("@")[0] || "Unknown";

  // Check bot admin
  const isBotAdmin = groupMetadata?.participants?.some(
    p => p.id === client.user.id && (p.admin === "admin" || p.admin === "superadmin")
  );

  let groupLink = "~🔐 Bot is not admin — Link disabled~";

  // Only if bot is admin → get link
  if (isBotAdmin) {
    try {
      const inviteCode = await client.groupInviteCode(groupJid);
      groupLink = `https://chat.whatsapp.com/${inviteCode}`;
    } catch (e) {
      groupLink = "N/A";
    }
  }


      captionText += `📌 *𝐅ʀᴏᴍ :* @${senderNumber}\n📂 *𝐆ʀᴏᴜᴘ:* ${groupName}\n🔗 *𝐋ɪɴᴋ:* ${groupLink}`;
    } else {
      const senderNumber = message.key.remoteJid.split("@")[0];
      captionText += `📌 *𝐅ʀᴏᴍ:* @${senderNumber}`;
    }

    if (["imageMessage", "videoMessage"].includes(mtype)) {
      messageContent.caption = captionText;
    }

    // Determine destination
    const destination = ANTI_VV === 'same-chat' ? from : client.user.id.split(":")[0] + "@s.whatsapp.net";

    // Send message
    await client.sendMessage(destination, messageContent, { quoted: message });

  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, { text: "❌ Error fetching vv message:\n" + error.message }, { quoted: message });
  }
});
