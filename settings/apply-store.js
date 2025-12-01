// ./settings/apply-store.js
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'apply-pending.json');

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return {};
    const raw = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

function writeAll(obj) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(obj, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}

async function setPending(jid, data) {
  const all = readAll();
  all[jid] = data;
  writeAll(all);
  return true;
}

async function getPending(jid) {
  const all = readAll();
  return all[jid] || null;
}

async function clearPending(jid) {
  const all = readAll();
  delete all[jid];
  writeAll(all);
  return true;
}

module.exports = {
  setPending,
  getPending,
  clearPending
};
