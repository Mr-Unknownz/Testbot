const { cmd } = require("../lib/command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

cmd({
  pattern: "vv",
  alias: ["viewonce", "❤️"],
  react: "🐳",
  desc: "Owner Only - retrieve quoted media back to user",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    // Check if message is replied
    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a view-once or media message!*"
      }, { quoted: message });
    }

    // Handle ephemeral/view-once messages
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

    // Send media back
    await client.sendMessage(from, messageContent, { quoted: message });

  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});
