// ./plugins/settings.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');
const selectionStore = require('../settings/selection-store');
const config = require('../settings/settings.json');
const fs = require("fs");

cmd({
  pattern: "settings",
  alias: ["setting","config","showsettings"],
  desc: "Show current bot settings (interactive). Reply number or use list.",
  category: "main",
  react: "📋",
  filename: __filename
}, async (conn, mek, m, { from, reply, sender, senderNumber }) => {
  try {

    // Load image (place your image at /media/settings.jpg)
    const imageBuffer = fs.readFileSync('./assets/settings.jpg');

    const all = await settingsDb.getAll();
    const allowed = settingsDb.ALLOWED;

    let out = '*< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐂ᴜʀʀᴇɴᴛ 𝐒ᴇᴛᴛɪɴɢꜱ. ⚙️*\n\n';
    const items = [];

    for (let i = 0; i < allowed.length; i++) {
      const k = allowed[i];
      const val = all[k] === undefined ? '🚫' : all[k];

      out += `🔹 *${i+1}❭❭▸ ${k}*\n💬 Cᴜʀʀᴇɴᴛ ɪꜱ ▸ ${val}\n`;

      // ORIGINAL FONTS — DO NOT CHANGE
      let choices = '';
      if ([
        'AUTO_BIO','AUTO_REPLY','AUTO_VOICE','AUTO_TYPING','AUTO_STICKER',
        'AUTO_RECORDING','ALWAYS_ONLINE','OWNER_REACT','AUTO_READ_STATUS',
        'BUTTON','MENTION_REPLY','ANTI_DELETE'
      ].includes(k)) {

        choices = '🔸 Cʜᴏɪᴄᴇꜱ ▸ 𝚃𝚁𝚄𝙴 & 𝙵𝙰𝙻𝚂𝙴';

      } else if ([
        'ANTI_VV','ANTI_DEL_PATH','STATUS_SAVE_PATH'
      ].includes(k)) {

        choices = '🔸 Cʜᴏɪᴄᴇꜱ ▸ 𝙸𝙽𝙱𝙾𝚇 & 𝚂𝙰𝙼𝙴-𝙲𝙷𝙰𝚃';

      } else if (['MODE'].includes(k)) {

        choices = '🔸 Cʜᴏɪᴄᴇꜱ ▸ 𝙸𝙽𝙱𝙾𝚇 & 𝙶𝚁𝙾𝚄𝙿𝚂 & 𝙿𝚁𝙸𝚅𝙰𝚃𝙴';

      } else {

        choices = '🔸 Cʜᴏɪᴄᴇꜱ ▸ ❲ 𝚃𝚈𝙿𝙴 .apply 𝚃𝙾 𝙲𝙷𝙰𝙽𝙶𝙴 𝚂𝚃𝚁𝙸𝙽𝙶𝚂 ❳';

      }

      out += `${choices}\n\n`;

      items.push({
        title: `🔹 ${i+1}❭❭▸ ${k}`,
        rowId: `settings_select|${k}`,
        description: choices
      });
    }

    out += '\n*ʀᴇᴘʟʏ ᴏɴʟʏ ɴᴜᴍʙᴇʀ (ᴇɢ: 3) ᴛᴏ ᴄʜᴀɴɢᴇ ꜱᴇᴛᴛɪɴɢ, ᴏʀ ᴜꜱᴇ ʟɪꜱᴛ ʙᴇʟᴏᴡ.*\n\n';
    out += '*ᴀꜰᴛᴇʀ ɢᴇᴛᴛɪɴɢ, ᴄʜᴏᴏꜱᴇ ᴛʜᴇ ɴᴇᴡ ᴠᴀʟᴜᴇ ꜰʀᴏᴍ ᴛʜᴇ ᴘʀᴇꜱᴇɴᴛᴇᴅ ᴏᴘᴛɪᴏɴꜱ.*';

    //=========================
    // 1️⃣ SEND MAIN MESSAGE WITH IMAGE
    //=========================
    await conn.sendMessage(from, {
      image: imageBuffer,
      caption: out
    }, { quoted: mek });

    //=========================
    // 2️⃣ LIST MESSAGE + SAME IMAGE
    //=========================
    const sections = [
      {
        title: "👇 ꜱᴇʟᴇᴄᴛ ᴀ ꜱᴇᴛᴛɪɴɢ ᴛᴏ ᴄʜᴀɴɢᴇ.",
        rows: items
      }
    ];

    const listMessage = {
      text: "👇 𝐒ᴇʟᴇᴄᴛ 𝐀 𝐒ᴇᴛᴛɪɴɢ 𝐓ᴏ 𝐂ʜᴀɴɢᴇ.",
      footer: config.FOOTER,
      buttonText: "❭❭ 𝙲𝙷𝙾𝙾𝚂𝙴 𝚂𝙴𝚃𝚃𝙸𝙽𝙶 ✗",
      sections
    };

    await conn.sendMessage(from, listMessage, { quoted: mek });

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
