// plugins/pair.js
const { cmd } = require("../lib/command");
const axios = require("axios");
const config = require("../settings");

cmd({
  pattern: "pair",
  alias: ["paircode", "pc"],
  react: "🔗",
  desc: "Get pairing code from Queen Jusmy Pair System",
  category: "owner",
  filename: __filename
},
async (client, message, match) => {
  try {

    // ==========================
    // SAFE MATCH HANDLING (FIX)
    // ==========================
    let input = "";

    if (typeof match === "string") input = match;
    else if (Array.isArray(match) && match[0]) input = match[0];
    else input = "";

    let number = input.trim().replace(/[^0-9]/g, "");

    // ==========================

    if (!number)
      return message.reply("📌 *Usage:* .pair 947XXXXXXXX");

    if (number.length < 9)
      return message.reply("❌ Invalid number.");

    await message.reply("⏳ *_𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 𝚀𝚄𝙴𝙴𝙽 𝙹𝚄𝚂𝙼𝚈 𝙿𝙰𝙸𝚁 𝙲𝙾𝙳𝙴..._*");

    const url = `https://queen-jusmy-pair.onrender.com/pair?number=${number}`;
    const res = await axios.get(url, {
      timeout: 15000,
      validateStatus: s => s < 500
    });

    let code = res?.data?.code;

    if (!code) {
      return message.reply("❌ Pair code not received — try again.");
    }

    // ==========================
    // MAIN PAIR MESSAGE
    // ==========================
    const mainMsg = `
*🔐 < | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 𝐏ᴀɪʀɪɴɢ 𝐒ʏꜱᴛᴇᴍ 🧚‍♀️*

📱 *𝙿𝙰𝙸𝚁𝙴𝙳 𝙽𝚄𝙼𝙱𝙴𝚁:* +${number}

✨ *𝚈𝙾𝚄𝚁 𝙿𝙰𝙸𝚁 𝙲𝙾𝙳𝙴:*  
\`\`\`${code}\`\`\`

⚠️ Do NOT share this with anyone.
    `;

    await client.sendMessage(
      message.from,
      { text: mainMsg },
      { quoted: message }
    );

    // ==========================
    // BUTTON ENABLED?
    // ==========================
    if (config.BUTTON === true) {
      await client.sendMessage(
        message.from,
        {
          text: `💬 *Ｐᴀɪʀ Ｃᴏᴅᴇ Ｃᴏɴᴛʀᴏʟᴇꜱ*\n▸ choose an action 👇`,
          buttons: [
            {
              buttonId: `copy_${code}`,
              buttonText: { displayText: "📋 𝙲𝙾𝙿𝚈 𝙲𝙾𝙳𝙴" },
              type: 1
            },
            {
              buttonId: `pair ${number}`,
              buttonText: { displayText: "🔄 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴 𝙰𝙶𝙰𝙸𝙽" },
              type: 1
            }
          ],
          headerType: 1
        },
        { quoted: message }
      );
    }

  } catch (err) {
    console.log("PAIR ERROR:", err);
    message.reply("❌ *Error generating Pair Code.* Try again.");
  }
});
