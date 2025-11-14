const { cmd } = require("../lib/command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const config = require("../settings");

// Config from environment variable
// 'same-chat' => send back to same chat
// 'inbox' => send to bot's inbox
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

    // Prepare message content
    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: quoted[mtype]?.caption || "",
          mimetype: quoted[mtype]?.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: quoted[mtype]?.caption || "",
          mimetype: quoted[mtype]?.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: quoted[mtype]?.mimetype || "audio/mp4",
          ptt: quoted[mtype]?.ptt || false
        };
        break;
    }

    // Determine destination
    let destination;
    if (ANTI_VV === 'same-chat') {
      destination = from; // original chat
    } else {
      destination = client.user.id.split(":")[0] + "@s.whatsapp.net"; // bot inbox
    }

    // Include sender info for groups
    let extraText = "";
    if (message.key.remoteJid.endsWith("@g.us")) {
      const sender = message.key.participant || message.key.remoteJid.split("@")[0];
      extraText = `\n\n📌 From: ${sender}\n📂 Group: ${message.key.remoteJid.split("@")[0]}`;
    }

    if (extraText && messageContent.caption) {
      messageContent.caption += extraText;
    } else if (extraText) {
      messageContent.caption = extraText;
    }

    // Send message
    await client.sendMessage(destination, messageContent, { quoted: message });

  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});
