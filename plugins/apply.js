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

// --- PENDING HANDLER ---
function savePending(sender, value) {
  let all = {};
  if (fs.existsSync(pendingPath)) {
    all = JSON.parse(fs.readFileSync(pendingPath, 'utf8'));
  }
  all[sender] = { value, time: Date.now() };
  fs.writeFileSync(pendingPath, JSON.stringify(all, null, 2));
}

function loadPending(sender) {
  if (!fs.existsSync(pendingPath)) return null;
  const all = JSON.parse(fs.readFileSync(pendingPath, 'utf8'));
  return all[sender] || null;
}

function clearPending(sender) {
  if (!fs.existsSync(pendingPath)) return;
  const all = JSON.parse(fs.readFileSync(pendingPath, 'utf8'));
  delete all[sender];
  fs.writeFileSync(pendingPath, JSON.stringify(all, null, 2));
}

// --- APPLY COMMAND ---
cmd({
  pattern: "apply",
  desc: "Apply a text to a string setting via number or list menu",
  category: "settings",
  react: "🛠️",
  filename: __filename
}, async (conn, mek, m, { args, reply, from }) => {

  const text = args.join(' ').trim();
  if (!text) return reply("❌ Usage: .apply <text>");

  // save pending value for this user
  savePending(m.sender, text);

  // build text with numbered list
  let listText = "*🔧 APPLY STRING SETTINGS*\n\n";
  STRING_SETTINGS.forEach((k, i) => {
    listText += `${i + 1}) *${k}*\n`; // value hidden
  });
  listText += `\nReply the number to apply:\n"${text}"`;

  // build list menu
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
    text: listText,
    footer: "Bot Settings",
    title: "STRING SETTINGS PANEL",
    buttonText: "Select Setting",
    sections
  };

  return conn.sendMessage(from, listMessage);
});

// --- HANDLE NUMBER REPLY OR LIST CLICK ---
cmd({
  on: "text"
}, async (conn, mek, m, { reply }) => {
  try {
    const pending = loadPending(m.sender);
    if (!pending) return; // no pending value

    let num = parseInt(m.text.trim());

    // handle list menu click (rowId)
    if (isNaN(num) && m.text.startsWith("apply_")) {
      num = parseInt(m.text.split("_")[1]);
    }

    if (isNaN(num) || num < 1 || num > STRING_SETTINGS.length) return;

    const key = STRING_SETTINGS[num - 1];
    const newValue = pending.value;

    await settingsDb.set(key, newValue);
    const newcfg = await settingsDb.updb();
    global.config = newcfg;

    clearPending(m.sender);
    return reply(`✅ *${key}* updated to:\n"${newValue}"`);
  } catch (e) {
    console.log(e);
    return reply("❌ Failed to apply setting");
  }
});
