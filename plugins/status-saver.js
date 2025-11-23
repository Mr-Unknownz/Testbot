const { cmd } = require("../lib/command");

cmd({
  pattern: "send",
  alias: ["sendme", "save", "evpn", "Ewhm", "Evapan", "dapan", "Dapan", "dpn"],
  react: '📤',
  desc: "Forwards quoted image/video/status back to user",
  category: "utility",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!match.quoted) return await client.sendMessage(from, { text: "*🍁 𝐏ʟᴇᴀꜱᴇ 𝐑ᴇᴘʟʏ 𝐓ᴏ 𝐀 𝐌ᴇꜱꜱᴀɢᴇ ...!*" }, { quoted: message });

    const quoted = match.quoted;
    let buffer;
    let messageContent = {};
    const options = { quoted: message };

    // ✅ Detect type correctly
    if (quoted.download) {
      buffer = await quoted.download();
      if (quoted.mtype === "imageMessage") messageContent = { image: buffer, caption: quoted.text || '' };
      else if (quoted.mtype === "videoMessage") messageContent = { video: buffer, caption: quoted.text || '', mimetype: quoted.mimetype || "video/mp4" };
      else if (quoted.mtype === "audioMessage") messageContent = { audio: buffer, mimetype: "audio/mp4", ptt: quoted.ptt || false };
      else return await client.sendMessage(from, { text: "❌ Only image/video/audio messages are supported!" }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);

  } catch (error) {
    console.error("Send Command Error:", error);
    await client.sendMessage(from, { text: "❌ Error sending message:\n" + error.message }, { quoted: message });
  }
});
