const { cmd } = require("../lib/command");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");

cmd({
  pattern: "vv",
  alias: ["viewonce", "❤️"],
  react: "🐳",
  desc: "Owner Only - retrieve quoted view-once / media messages",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a view-once or media message!*"
      }, { quoted: message });
    }

    let quotedMsg = match.quoted;

    // 🔹 Safe access to message content
    let msgContent = quotedMsg?.message?.ephemeralMessage?.message || quotedMsg?.message;
    if (!msgContent) {
      return await client.sendMessage(from, {
        text: "*❌ Could not fetch message content!*"
      }, { quoted: message });
    }

    // 🔹 Detect the inner message type dynamically
    const mtype = Object.keys(msgContent)[0];

    // 🔹 Download media safely
    const buffer = await downloadMediaMessage({ message: msgContent });

    const options = { quoted: message };
    let messageContent = {};

    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: msgContent.imageMessage.caption || '',
          mimetype: msgContent.imageMessage.mimetype || "image/jpeg"
        };
        break;

      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: msgContent.videoMessage.caption || '',
          mimetype: msgContent.videoMessage.mimetype || "video/mp4"
        };
        break;

      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: msgContent.audioMessage?.mimetype || "audio/mp4",
          ptt: msgContent.audioMessage?.ptt || false
        };
        break;

      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, options);
    }

    // 🔹 Send the media back
    await client.sendMessage(from, messageContent, options);

  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});
