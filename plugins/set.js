// ./plugins/set.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');

cmd({
  pattern: "set",
  desc: "Owner only - update a bot setting. Usage: .set <SETTING> <VALUE>",
  category: "owner",
  react: "🛠️",
  filename: __filename
}, async (conn, mek, m, { from, args, reply, sender, senderNumber }) => {
  try {
    const isOwner = (Array.isArray(global.config?.OWNER_NUMBER) && global.config.OWNER_NUMBER.includes(senderNumber)) || false;
    if (!isOwner) return reply('❌ Only owner can use this command.');

    if (!args || args.length < 2) return reply('Usage: .set <SETTING> <VALUE>\nExample: .set prefix !');

    const key = args[0].toUpperCase();
    const value = args.slice(1).join(' ');

    // check allowed
    if (!settingsDb.ALLOWED.includes(key)) {
      return reply(`❌ Setting "${key}" is not updatable via this command.`);
    }

    // apply
    await settingsDb.set(key, value);
    // refresh global.config by calling updb and assign
    const newcfg = await settingsDb.updb();
    global.config = newcfg;

    return reply(`✅ Updated ${key} -> ${value}\nApplied live.`);
  } catch (e) {
    console.error('SET PLUGIN ERROR', e);
    return reply('❌ Failed to update setting: ' + (e.message || e));
  }
});
