const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');
const fs = require('fs');
const path = require('path');

// String-type settings only (no booleans, no inbox/same-chat)
const STRING_SETTINGS = [
  "PREFIX",
  "SESSION_ID",
  "ALIVE_MSG",
  "ALIVE_IMG",
  "FOOTER"
];

const pendingPath = path.join(__dirname, '../settings/apply-pending.json');

function savePending(obj) {
  fs.writeFileSync(pendingPath, JSON.stringify(obj, null, 2));
}
function loadPending() {
  if (!fs.existsSync(pendingPath)) return null;
  return JSON.parse(fs.readFileSync(pendingPath, 'utf8'));
}
function clearPending() {
  if (fs.existsSync(pendingPath)) fs.unlinkSync(pendingPath);
}

cmd({
  pattern: "apply",
  desc: "Apply a text to a string setting via selection menu",
  category: "settings",
  react: "🛠️",
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {

  const text = args.join(' ').trim();
  if (!text) return reply("❌ Usage: .apply <text>");

  const all = await settingsDb.getAll();

  let list = "*🔧 APPLY STRING SETTINGS*\n\n";
  STRING_SETTINGS.forEach((k, i) => {
    list += `${i + 1}) *${k}* : ${all[k]}\n`;
  });

  list += `\nReply the number to apply:\n"${text}"`;

  savePending({
    from: m.sender,
    value: text,
    time: Date.now()
  });

  return reply(list);
});

// Handle reply to apply
cmd({
  on: "text"
}, async (conn, mek, m, { reply }) => {
  try {
    const pending = loadPending();
    if (!pending) return;
    if (pending.from !== m.sender) return;

    const num = parseInt(m.text.trim());
    if (isNaN(num) || num < 1 || num > STRING_SETTINGS.length) return;

    const key = STRING_SETTINGS[num - 1];
    const newValue = pending.value;

    await settingsDb.set(key, newValue);
    const newcfg = await settingsDb.updb();
    global.config = newcfg;

    clearPending();
    return reply(`✅ *${key}* updated to:\n"${newValue}"`);
  } catch (e) {
    console.log(e);
    return reply("❌ Failed to apply setting");
  }
});
