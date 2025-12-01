// ./plugins/apply.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');
const store = require('../settings/apply-store');

cmd({
  pattern: "apply",
  desc: "Apply string settings using menu or number reply",
  category: "settings",
  react: "📑",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {

  try {
    const botJid = conn.user.id.split(':')[0];
    const sender = m.sender.split('@')[0];

    // allow ONLY bot creator to control
    if (sender !== botJid) return;   // ignore others

    if (!args[0])
      return reply("⚠️ Usage: .apply <your_value>");

    const newValue = args.join(' ');

    const STR_SETTINGS = [
      "PREFIX",
      "SESSION_ID",
      "ALIVE_MSG",
      "ALIVE_IMG",
      "FOOTER"
    ];

    // make selection text
    let txt = `*📑 APPLY STRING SETTINGS*\n`;
    txt += `Your input: *${newValue}*\n\n`;
    txt += `Reply the number OR choose from list 👇\n\n`;

    STR_SETTINGS.forEach((k, i) => {
      txt += `*${i + 1}) ${k}*\n`;
    });

    // interactive list (buttons-like) 
    const sections = [{
      title: "String Settings",
      rows: STR_SETTINGS.map((k, idx) => ({
        title: `${idx + 1}. ${k}`,
        rowId: `.apply_do ${k} ${newValue}`
      }))
    }];

    // send menu + set store
    const sent = await conn.sendMessage(from, {
      text: txt,
      footer: "Select or reply number",
      title: "String Settings Panel",
      buttonText: "SELECT SETTING",
      sections
    }, { quoted: mek });

    // save to store
    await store.setPending(from, {
      msgId: sent.key.id,
      value: newValue
    });

  } catch (e) {
    console.log("APPLY ERROR", e);
  }
});

// number replies handler
cmd({
  on: "text"
}, async (conn, mek, m) => {
  try {
    const botJid = conn.user.id.split(':')[0];
    const sender = m.sender.split('@')[0];
    if (sender !== botJid) return;

    const pending = await store.getPending(m.chat);
    if (!pending) return;

    // check reply to correct message
    if (m.quoted && m.quoted.id !== pending.msgId) return;

    const choice = m.text.trim();
    const index = parseInt(choice);
    if (isNaN(index)) return;

    const STR_SETTINGS = [
      "PREFIX",
      "SESSION_ID",
      "ALIVE_MSG",
      "ALIVE_IMG",
      "FOOTER"
    ];

    const target = STR_SETTINGS[index - 1];
    if (!target) return conn.sendMessage(m.chat, { text: "❌ Invalid number." });

    // apply update
    await settingsDb.set(target, pending.value);
    global.config = await settingsDb.updb();

    await conn.sendMessage(m.chat, { text: `✅ Updated *${target}* → *${pending.value}*` });

    await store.clearPending(m.chat);

  } catch (e) {
    console.log("APPLY-REPLY ERR", e);
  }
});

// list click handler (.apply_do)
cmd({
  pattern: "apply_do"
}, async (conn, mek, m, { args, from }) => {

  try {
    const botJid = conn.user.id.split(':')[0];
    const sender = m.sender.split('@')[0];
    if (sender !== botJid) return;

    const key = args[0];
    const newValue = args.slice(1).join(' ');

    await settingsDb.set(key, newValue);
    global.config = await settingsDb.updb();

    await conn.sendMessage(from, { text: `✅ Updated *${key}* → *${newValue}*` });

    await store.clearPending(from);

  } catch (e) {
    console.log("apply_do ERROR", e);
  }
});
