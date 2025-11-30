// ./plugins/apply.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');
const fs = require('fs');
const path = require('path');

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

// ---- APPLY COMMAND ----
cmd({
  pattern: "apply",
  desc: "Apply a text to a string setting via selection menu",
  category: "settings",
  react: "🛠️",
  filename: __filename
}, async (conn, mek, m, { args, reply, from }) => {

  const text = args.join(' ').trim();
  if (!text) return reply("❌ Usage: .apply <text>");

  const all = await settingsDb.getAll();

  // Text + numbered list
  let list = "*🔧 APPLY STRING SETTINGS*\n\n";
  STRING_SETTINGS.forEach((k, i) => {
    list += `${i + 1}) *${k}*\n`; // current value hidden
  });
  list += `\nReply the number to apply:\n"${text}"`;

  savePending({
    from: m.sender,
    value: text,
    time: Date.now()
  });

  // Build list menu
  const sections = [
    {
      title: "Or select setting from list",
      rows: STRING_SETTINGS.map((key, i) => ({
        title: key,
        rowId: `apply_${i + 1}`
      }))
    }
  ];

  const listMessage = {
    text: list,
    footer: "Bot Settings",
    title: "STRING SETTINGS PANEL",
    buttonText: "Select Setting",
    sections
  };

  return conn.sendMessage(from, listMessage);
});

// ---- HANDLE NUMBER REPLY OR LIST CLICK ----
cmd({
  on: "text"
}, async (conn, mek, m, { reply }) => {
  try {
    const pending = loadPending();
    if (!pending) return;
    if (pending.from !== m.sender) return;

    let num = parseInt(m.text.trim());

    // Handle rowId from list click (e.g., apply_1)
    if (isNaN(num) && m.text.startsWith("apply_")) {
      num = parseInt(m.text.split("_")[1]);
    }

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
