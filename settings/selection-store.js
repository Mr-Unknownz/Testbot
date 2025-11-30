// ./settings/selection-store.js
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'selection-pending.json');

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return {};
    const txt = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(txt || '{}');
  } catch (e) {
    return {};
  }
}
function writeAll(obj) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(obj, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

async function setPending(number, data) {
  const all = readAll();
  all[number] = data;
  writeAll(all);
  return true;
}
async function getPending(number) {
  const all = readAll();
  return all[number] || null;
}
async function clearPending(number) {
  const all = readAll();
  delete all[number];
  writeAll(all);
  return true;
}
module.exports = {
  setPending,
  getPending,
  clearPending
};
