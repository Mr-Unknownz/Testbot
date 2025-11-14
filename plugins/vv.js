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

    // 🔹 Handle ephemeral / view-once wrapper
    if (quotedMsg.message.ephemeralMessage) {
      quotedMsg = {
        ...quotedMsg,
        message: quotedMsg.message.ephemeralMessage.message
      };
    }

    // 🔹 Detect the inner message type dynamically
    const mtype = Object.keys(quotedMsg.message)[0];

    // 🔹 Download media safely
    const buffer = await downloadMediaMessage(quotedMsg);

    const options = { quoted: message };
    let messageContent = {};

    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: quotedMsg.message.imageMessage.caption || '',
          mimetype: quotedMsg.message.imageMessage.mimetype || "image/jpeg"
        };
        break;

      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: quotedMsg.message.videoMessage.caption || '',
          mimetype: quotedMsg.message.videoMessage.mimetype || "video/mp4"
        };
        break;

      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: quotedMsg.message.audioMessage.mimetype || "audio/mp4",
          ptt: quotedMsg.message.audioMessage.ptt || false
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
