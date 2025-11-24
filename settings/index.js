// ./settings/index.js
const path = require('path');
const defaultConfig = require('../settings.js'); // your original config.js (defaults)
const db = require('./settings-db');

let current = { ...defaultConfig };

// allowed settings to be updated by .set (we excluded OWNER_*, BOT_NAME)
const ALLOWED = [
  'PREFIX',
  'SESSION_ID',
  'ALIVE_MSG',
  'ALIVE_IMG',
  'FOOTER',
  'MODE',
  'BUTTON',
  'MENTION_REPLY',
  'AUTO_REPLY',
  'AUTO_VOICE',
  'AUTO_TYPING',
  'AUTO_BIO',
  'AUTO_RECORDING',
  'ALWAYS_ONLINE',
  'ANTI_DELETE',
  'ANTI_VV',
  'ANTI_DEL_PATH',
  'STATUS_SAVE_PATH',
  'AUTO_READ_STATUS'
];

// helper to coerce booleans from strings (preserve previous behavior)
function toMaybeBool(v) {
  if (typeof v === 'string') {
    const low = v.toLowerCase();
    if (low === 'true') return 'true';
    if (low === 'false') return 'false';
  }
  return v;
}

async function load() {
  // Ensure DB/local exists; defaults merged
  const defaults = {
    ...defaultConfig
  };

  const remote = await db.ensureExists(defaults).catch(() => null);
  if (remote) {
    // merge remote on top of defaults (remote may be a partial set)
    current = { ...defaults, ...remote };
    // ensure types/formatting for known booleans remain strings like before
    if (current.AUTO_READ_STATUS === undefined) current.AUTO_READ_STATUS = defaults.AUTO_READ_STATUS;
  } else {
    current = { ...defaults };
  }
  return current;
}

async function getAll() {
  if (!current) await load();
  return current;
}

async function get(key) {
  if (!current) await load();
  return current[key];
}

async function set(key, value) {
  if (!ALLOWED.includes(key)) throw new Error('Setting not allowed to update');
  // ensure loaded
  if (!current) await load();
  // normalize value
  const normalized = toMaybeBool(value);
  current[key] = normalized;
  // persist to local and try GitHub
  await db.writeLocal(current);
  await db.githubCreateOrUpdateFile(current).catch(() => null);
  return current;
}

// apply changes to in-memory config object used elsewhere (global.config)
async function updb() {
  if (!current) await load();
  // copy to defaultConfig object shape (mutate defaultConfig so other modules using require('../config.js') keep using old values?).
  // Instead we'll provide updated object to be assigned to global.config in main file
  return { ...defaultConfig, ...current };
}

module.exports = {
  load,
  getAll,
  get,
  set,
  updb,
  ALLOWED,
};
