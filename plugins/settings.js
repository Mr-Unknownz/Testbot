// ./plugins/settings.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');

cmd({
  pattern: "settings",
  alias: ["setting","config"],
  desc: "Show current bot settings",
  category: "main",
  react: "📋",
  filename: __filename
}, async (conn, mek, m, { from, reply, sender, senderNumber }) => {
  try {
    const all = await settingsDb.getAll();
    // Only show updateable settings (exclude owner/bot name sensitive)
    const showKeys = settingsDb.ALLOWED;
    let out = '*📡 CURRENT BOT SETTINGS*\n\n';
    for (const k of showKeys) {
      out += `*${k}*: ${all[k] === undefined ? '—' : all[k]}\n`;
    }
    out += `\n*🔒 OWNER settings and BOT_NAME are not shown here.*`;
    return reply(out);
  } catch (e) {
    console.error('SETTINGS PLUGIN ERROR', e);
    return reply('❌ Could not fetch settings.');
  }
});
