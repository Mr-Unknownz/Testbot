// ./plugins/set.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');

cmd({
  pattern: "set",
  desc: "Update a bot setting. Usage: .set <SETTING> <VALUE>",
  category: "settings",
  react: "🛠️",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {

    if (!args || args.length < 2) 
      return reply('Usage: .set <SETTING> <VALUE>\nExample: .set prefix !');

    const key = args[0].toUpperCase();
    const value = args.slice(1).join(' ');

    // check allowed settings
    if (!settingsDb.ALLOWED.includes(key)) {
      return reply(`❌ Setting "${key}" cannot be updated.`);
    }

    // apply update
    await settingsDb.set(key, value);

    // refresh config live
    const newcfg = await settingsDb.updb();
    global.config = newcfg;

    return reply(`✅ Updated *${key}* → *${value}*\n<Settings Applied Live>`);
    
  } catch (e) {
    console.error('SET PLUGIN ERROR', e);
    return reply('❌ Error updating setting: ' + (e.message || e));
  }
});
