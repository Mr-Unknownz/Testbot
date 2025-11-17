const { cmd } = require('../lib/command');
const axios = require('axios');
const config = require('../settings');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions');

cmd({
    pattern: "pair",
    alias: ["getpair", "freebot"],
    react: "✅",
    desc: "Get pairing code for NOVA-X MD bot",
    category: "download",
    use: ".pair 947412593XX",
    filename: __filename
}, async (conn, mek, m, { q, senderNumber, reply, from }) => {
    try {
        const phoneNumber = q
            ? q.trim().replace(/[^0-9]/g, '')
            : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 947412593XX`");
        }

        await reply("⏳ *Ｇ𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 Ｙ𝙾𝚄𝚁 Ｐ𝙰𝙸𝚁𝙸𝙽𝙶 Ｃ𝙾𝙳𝙴...*\n\n𝐏ʟᴇᴀꜱ𝐄 𝐖ᴀɪ𝐓 𝐖ʜɪʟ𝐄 𝐖𝐄 𝐂ᴏɴɴᴇᴄ𝐓 𝐓𝐎 𝐓ʜ𝐄 𝐍ᴏᴠ𝐀-𝐗 𝐌𝐃 𝐒ᴇʀᴠᴇ𝐑.");

        const res = await axios.get(`https://queen-jusmy-pair.onrender.com/pair?number=${encodeURIComponent(phoneNumber)}`);

        if (!res.data || !res.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = res.data.code;
        const instructions = 
            `✅ *Ｎᴏᴠᴀ-Ｘ ＭＤ ＰᴀɪʀɪɴＧ ＣᴏᴍᴘʟᴇᴛᴇＤ*\n\n` +
            `*𝐘𝐨𝐮𝐫 𝐏𝐚𝐢𝐫𝐢𝐧𝐠 𝐂𝐨𝐝𝐞 𝐈𝐬:* \`\`\`${pairingCode}\`\`\`\n\n` +
            `📌 *𝐈𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐨𝐧𝐬 𝐅𝐨𝐫 𝐏𝐚𝐢𝐫:*\n` +
            `1. 𝙾𝙿𝙴𝙽 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙾𝙽 𝚈𝙾𝚄𝚁 𝙳𝙴𝚅𝙸𝙲𝙴.\n` +
            `2. 𝙶𝙾 𝚃𝙾 *𝙻𝙸𝙽𝙺𝙴𝙳 𝙳𝙴𝚅𝙸𝙲𝙴𝚂*.\n` +
            `3. 𝙲𝙻𝙸𝙲𝙺 𝙾𝙽 *𝙻𝙸𝙽𝙺 𝚆𝙸𝚃𝙷 𝙿𝙷𝙾𝙽𝙴 𝙽𝚄𝙼𝙱𝙴𝚁*.\n` +
            `4. 𝙴𝙽𝚃𝙴𝚁 𝚃𝙷𝙴 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 𝙲𝙾𝙳𝙴 𝙰𝙱𝙾𝚅𝙴.\n` +
            `5. 𝚆𝙰𝙸𝚃 𝙵𝙾𝚁 𝚃𝙷𝙴 𝙱𝙾𝚃 𝚃𝙾 𝙲𝙾𝙽𝙽𝙴𝙲𝚃.\n\n` +
            `⚠️ *ＮＯＴＥ:* 𝚃𝙷𝙸𝚂 𝙲𝙾𝙳𝙴 𝚆𝙸𝙻𝙻 𝙴𝚇𝙿𝙸𝚁𝙴 𝙸𝙽 1 𝙼𝙸𝙽𝚄𝚃𝙴. 𝚄𝚂𝙴 𝙸𝚃 𝙸𝙼𝙼𝙴𝙳𝙸𝙰𝚃𝙻𝚈..!`;

       if (process.env.BUTTON === 'true') {
    await conn.sendMessage(from, {
        text: instructions,
        footer: "NOVA-X MD Pairing System",
        templateButtons: [
            {
                index: 1,
                quickReplyButton: {
                    displayText: `📋 COPY CODE`,
                    id: pairingCode   // <-- OTP Direct Copy Text
                }
            },
            {
                index: 2,
                quickReplyButton: {
                    displayText: "🔄 GENERATE AGAIN",
                    id: `.pair ${phoneNumber}`
                }
            }
        ]
    }, { quoted: mek });
} else {
    await reply(instructions);
    await new Promise(r => setTimeout(r, 2000));
    await reply(pairingCode);
}

    } catch (err) {
        console.error("Pair command error:", err);
        await reply("❌ An error occurred while getting pairing code. Please try again later.");
    }
});
