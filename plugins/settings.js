// ./plugins/settings.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');
const selectionStore = require('../settings/selection-store');

cmd({
  pattern: "settings",
  alias: ["setting","config"],
  desc: "Show current bot settings (interactive). Reply number or use list.",
  category: "main",
  react: "📋",
  filename: __filename
}, async (conn, mek, m, { from, reply, sender, senderNumber }) => {
  try {
    const all = await settingsDb.getAll();
    const allowed = settingsDb.ALLOWED; // array of keys to show

    // Build numbered list text
    let out = '*📡 CURRENT BOT SETTINGS*\n\n';
    const items = []; // for list sections
    for (let i = 0; i < allowed.length; i++) {
      const k = allowed[i];
      const val = all[k] === undefined ? '—' : all[k];
      out += `*${i+1}) ${k}* : ${val}\n`;
      // Add possible choices info for the main toggles (we'll show boolean and inbox/same-chat choices later)
      let choices = '';
      if (['AUTO_BIO','AUTO_REPLY','AUTO_VOICE','AUTO_TYPING','AUTO_STICKER','AUTO_RECORDING','ALWAYS_ONLINE','OWNER_REACT','AUTO_READ_STATUS','BUTTON','MENTION_REPLY','ANTI_DELETE'].includes(k)) {
        choices = 'Choices: true / false';
      } else if (['ANTI_VV','ANTI_DEL_PATH','STATUS_SAVE_PATH'].includes(k)) {
        choices = 'Choices: inbox / same-chat';
      } else {
        choices = 'Choices: (use .set or reply to select)';
      }
      out += `    ${choices}\n\n`;

      // prepare list item
      items.push({
        title: `${i+1}) ${k}`,
        rowId: `settings_select|${k}`, // selectedId will be parsed later
        description: `Current: ${val} — ${choices}`
      });
    }

    out += '\n_Reply with the number (e.g. 3) to pick a setting, or use the list below._\n';
    out += '_After picking, choose the new value from the presented options (true/false or inbox/same-chat)._';

    // Send numbered text first
    await conn.sendMessage(from, { text: out }, { quoted: mek });

    // Send List Message (Baileys list)
    // Build sections as one section with rows
    const sections = [
      {
        title: "Editable Settings",
        rows: items
      }
    ];

    const listMessage = {
      text: "Select a setting to change (list).",
      footer: "Select or reply number.",
      buttonText: "Choose setting",
      sections
    };

    await conn.sendMessage(from, listMessage, { quoted: mek });

    // store a short-lived state to accept numeric replies (so we know user is in selection mode)
    await selectionStore.setPending(senderNumber, {
      mode: 'choose_setting',
      allowed,
      timestamp: Date.now()
    });

  } catch (e) {
    console.error('SETTINGS PLUGIN ERROR', e);
    return reply('❌ Could not fetch settings.');
  }
});
