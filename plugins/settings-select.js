// ./plugins/settings-select.js
const { cmd } = require('../lib/command');
const settingsDb = require('../settings/index');
const selectionStore = require('../settings/selection-store');

cmd({
  pattern: ".*", // catch-all plugin (the bot's command dispatcher runs plugins for on="body" etc)
  on: "body",
  desc: "Internal: catch numeric replies or list selects for settings change",
  category: "internal",
  react: null,
  filename: __filename
}, async (conn, mek, m, { from, prefix, l, quoted, body, isCmd, args, q, isGroup, sender, senderNumber, reply }) => {
  try {
    const plain = (body || '').trim();
    if (!plain) return;

    // Check pending selection for this user
    const state = await selectionStore.getPending(senderNumber);
    if (!state) return; // nothing to handle

    // Expire if older than 5 minutes
    if (Date.now() - (state.timestamp || 0) > 5 * 60 * 1000) {
      await selectionStore.clearPending(senderNumber);
      return reply('⏱️ Selection timed out. Run .settings again to change settings.');
    }

    // Case 1: User replied with a number -> pick the setting
    if (/^\d+$/.test(plain)) {
      const idx = parseInt(plain, 10) - 1;
      if (idx < 0 || idx >= state.allowed.length) {
        return reply('❌ Invalid number. Please reply with a number from the list shown in .settings.');
      }
      const key = state.allowed[idx];
      // prepare options depending on key type
      let options = [];
      if (['AUTO_BIO','AUTO_REPLY','AUTO_VOICE','AUTO_TYPING','AUTO_STICKER','AUTO_RECORDING','ALWAYS_ONLINE','OWNER_REACT','AUTO_READ_STATUS','BUTTON','MENTION_REPLY','ANTI_DELETE'].includes(key)) {
        options = [
          { id: `settings_apply|${key}|true`, title: 'true', description: 'Enable' },
          { id: `settings_apply|${key}|false`, title: 'false', description: 'Disable' }
        ];
      } else if (['ANTI_VV','ANTI_DEL_PATH','STATUS_SAVE_PATH'].includes(key)) {
        options = [
          { id: `settings_apply|${key}|inbox`, title: 'inbox', description: 'Send to bot inbox' },
          { id: `settings_apply|${key}|same-chat`, title: 'same-chat', description: 'Send to same chat' }
        ];
      } else {
        // For other keys, fallback: instruct to use .set command
        await selectionStore.clearPending(senderNumber);
        return reply(`🔧 *${key}* cannot be changed via interactive menu.\nPlease use the text command:\n.set ${key} <value>`);
      }

      // send list of choices (as quick reply list)
      const sections = [{ title: `Change ${key}`, rows: options.map(o => ({ title: o.title, rowId: o.id, description: o.description })) }];
      await conn.sendMessage(from, {
        text: `Choose new value for *${key}*`,
        footer: `Current: ${ (await settingsDb.get(key)) || '—' }`,
        buttonText: 'Select value',
        sections
      }, { quoted: mek });

      // update pending to next stage
      await selectionStore.setPending(senderNumber, {
        mode: 'choose_value',
        key,
        timestamp: Date.now()
      });

      return;
    }

    // Case 2: User replied with a direct value (true/false/inbox/same-chat) as plain text
    const low = plain.toLowerCase();
    if (['true','false','inbox','same-chat'].includes(low) && state.mode === 'choose_setting') {
      // they replied value without selecting setting -> invalid, ask to pick setting first
      return reply('❗ Please first select which setting to change (reply with number or use the list from .settings).');
    }

    // If state.mode == 'choose_value' and user replies with value directly
    if (state.mode === 'choose_value' && ['true','false','inbox','same-chat'].includes(low)) {
      const key = state.key;
      const value = low;
      // apply
      await settingsDb.set(key, value);
      const newcfg = await settingsDb.updb();
      global.config = newcfg;
      await selectionStore.clearPending(senderNumber);
      return reply(`✅ Updated *${key}* → *${value}* (applied live).`);
    }

    // If message is a list selection (listResponseMessage or buttons) — in main index.js body resolves selected id into body variable already.
    // For safety, support messages that arrived like 'settings_select|KEY' or 'settings_apply|KEY|VALUE'
    if (plain.startsWith('settings_select|')) {
      const parts = plain.split('|');
      const key = parts[1];
      // same flow as number -> show value options
      // prepare options same as above
      let options = [];
      if (['AUTO_BIO','AUTO_REPLY','AUTO_VOICE','AUTO_TYPING','AUTO_STICKER','AUTO_RECORDING','ALWAYS_ONLINE','OWNER_REACT','AUTO_READ_STATUS','BUTTON','MENTION_REPLY','ANTI_DELETE'].includes(key)) {
        options = [
          { id: `settings_apply|${key}|true`, title: 'true', description: 'Enable' },
          { id: `settings_apply|${key}|false`, title: 'false', description: 'Disable' }
        ];
      } else if (['ANTI_VV','ANTI_DEL_PATH','STATUS_SAVE_PATH'].includes(key)) {
        options = [
          { id: `settings_apply|${key}|inbox`, title: 'inbox', description: 'Send to bot inbox' },
          { id: `settings_apply|${key}|same-chat`, title: 'same-chat', description: 'Send to same chat' }
        ];
      } else {
        await selectionStore.clearPending(senderNumber);
        return reply(`🔧 *${key}* cannot be changed via interactive menu. Use .set ${key} <value>`);
      }
      const sections = [{ title: `Change ${key}`, rows: options.map(o => ({ title: o.title, rowId: o.id, description: o.description })) }];
      await conn.sendMessage(from, {
        text: `Choose new value for *${key}*`,
        footer: `Current: ${ (await settingsDb.get(key)) || '—' }`,
        buttonText: 'Select value',
        sections
      }, { quoted: mek });

      await selectionStore.setPending(senderNumber, {
        mode: 'choose_value',
        key,
        timestamp: Date.now()
      });
      return;
    }

    if (plain.startsWith('settings_apply|')) {
      const parts = plain.split('|');
      const key = parts[1];
      const value = parts[2];
      // apply
      if (!key || !value) return reply('❌ Invalid selection.');
      // validate allowed
      if (!settingsDb.ALLOWED.includes(key)) {
        return reply('❌ That setting cannot be changed.');
      }
      await settingsDb.set(key, value);
      const newcfg = await settingsDb.updb();
      global.config = newcfg;
      await selectionStore.clearPending(senderNumber);
      return reply(`✅ Updated *${key}* → *${value}* (applied live).`);
    }

    // If nothing matched, ignore; let other plugins handle normal commands
    return;

  } catch (e) {
    console.error('SETTINGS-SELECT ERROR', e);
  }
});
