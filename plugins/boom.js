const config = require('../settings/settings.json');
const { cmd, commands } = require('../lib/command');

cmd({
    pattern: "boom",
    desc: "Send a message multiple times (Owner Only)",
    category: "utility",
    react: "🔁",
    filename: __filename
},
async (conn, mek, m, { from, reply, isOwner, q }) => {
    // Owner-only restriction
    if (!isOwner) return reply('🚫 *Owner only command!*');

    try {
        // Check format: .boom text,count
        if (!q.includes(',')) {
            return reply("❌ *Format:* .boom text,count\n*Example:* .boom Hello,5");
        }

        const [message, countStr] = q.split(',');
        const count = parseInt(countStr.trim());

        // Hard limit: 1-1000 messages
        if (isNaN(count) || count < 1 || count > 1000) {
            return reply("❌ *Max 1000 messages at once!*");
        }

        // Silent execution (no confirmations)
        for (let i = 0; i < count; i++) {
            await conn.sendMessage(from, { text: message }, { quoted: null });
            if (i < count - 1) await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("Error in boom command:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

