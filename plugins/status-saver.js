const { cmd } = require('../lib/command');
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const fs = require('fs');
const config = require('../settings');

cmd({
  pattern: "save",
  alias: ["statussave", "ssave"],
  desc: "Save WhatsApp status by replying to it",
  category: "tools",
  react: "📥",
}, 
async (message, client, args) => {
  
  try {
    if (!message.quoted) {
      return await message.reply("❗ *Reply to a WhatsApp status (image/video) to save it.*");
    }

    const caption = args.join(" ") || ""; // user caption support
    const mime = message.quoted.mtype;

    if (!mime.includes("image") && !mime.includes("video")) {
      return await message.reply("❗ *You must reply to an Image/Video status.*");
    }

    // ─────────────────────────────────────
    // 0. GET SENDER NUMBER
    // ─────────────────────────────────────
    const sender = message.quoted.key?.participant || message.quoted.participant || message.quoted.sender;
    const senderNum = sender ? sender.split("@")[0] : "Unknown";

    // ─────────────────────────────────────
    // 1. DOWNLOAD STATUS
    // ─────────────────────────────────────
    const buffer = await downloadContentFromMessage(message.quoted, mime.split("/")[0]);
    let temp = Buffer.from([]);

    for await (const chunk of buffer) {
      temp = Buffer.concat([temp, chunk]);
    }

    // ─────────────────────────────────────
    // 2. SEND LOCATION (Inbox / Same-chat)
    // ─────────────────────────────────────
    const mode = config.STATUS_SAVE_PATH || "inbox";

    let targetJID = (mode === "same-chat")
      ? message.chat
      : client.user.id; // bot inbox

    // ─────────────────────────────────────
    // 3. BUILD FINAL CAPTION
    // ─────────────────────────────────────
    const finalCaption =
`📥 *Status Saved Successfully!*

👤 *Uploaded By:* +${senderNum}
${caption ? `\n📝 *Caption:*\n${caption}\n` : ""}

${config.FOOTER}`;

    // ─────────────────────────────────────
    // 4. SEND MEDIA
    // ─────────────────────────────────────
    if (mime.includes("image")) {
      await client.sendMessage(targetJID, { image: temp, caption: finalCaption });
    } else {
      await client.sendMessage(targetJID, { video: temp, caption: finalCaption });
    }

    await message.reply("✅ *Status saved successfully!*");

  } catch (err) {
    console.log(err);
    await message.reply("❗ *Error while saving status!*");
  }
});
