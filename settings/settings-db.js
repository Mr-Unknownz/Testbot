// ./settings/settings-db.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../settings/settings.json');

const GITHUB_USER = config.GITHUB_USER || 'ranawakagevijitha';
const GITHUB_REPO = config.GITHUB_REPO || 'Testbot';
const GITHUB_TOKEN = config.GITHUB_TOKEN || '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';
const REMOTE_PATH = 'settings/settings.json';
const LOCAL_PATH = path.join(__dirname, 'local-settings.json');

function githubHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  return headers;
}

async function githubGetFile() {
  if (!GITHUB_USER || !GITHUB_REPO) return null;
  try {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${REMOTE_PATH}`;
    const res = await axios.get(url, { headers: githubHeaders() });
    if (res.data && res.data.content) {
      const buff = Buffer.from(res.data.content, 'base64');
      return JSON.parse(buff.toString('utf8'));
    }
  } catch (e) {
    // console.error('GitHub get error', e.message);
    return null;
  }
  return null;
}

async function githubCreateOrUpdateFile(contentObj) {
  if (!GITHUB_USER || !GITHUB_REPO) return false;
  try {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${REMOTE_PATH}`;
    // get existing to fetch sha
    const getRes = await axios.get(url, { headers: githubHeaders() }).catch(() => null);
    const body = {
      message: `Update settings.json by bot`,
      content: Buffer.from(JSON.stringify(contentObj, null, 2)).toString('base64'),
    };
    if (getRes && getRes.data && getRes.data.sha) body.sha = getRes.data.sha;
    await axios.put(url, body, { headers: githubHeaders() });
    return true;
  } catch (e) {
    // console.error('GitHub put error', e.message);
    return false;
  }
}

function readLocal() {
  try {
    if (!fs.existsSync(LOCAL_PATH)) {
      return null;
    }
    const txt = fs.readFileSync(LOCAL_PATH, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    // console.error('readLocal err', e.message);
    return null;
  }
}

function writeLocal(obj) {
  try {
    fs.writeFileSync(LOCAL_PATH, JSON.stringify(obj, null, 2), 'utf8');
    return true;
  } catch (e) {
    // console.error('writeLocal err', e.message);
    return false;
  }
}

async function ensureExists(defaults = {}) {
  // try GitHub first
  const remote = await githubGetFile();
  if (remote) {
    // write local copy
    writeLocal(remote);
    return remote;
  }
  // no remote -> fallback to local
  let local = readLocal();
  if (!local) {
    // create from defaults
    writeLocal(defaults);
    local = defaults;
    // try push to GitHub (best-effort)
    await githubCreateOrUpdateFile(local);
  }
  return local;
}

module.exports = {
  ensureExists,
  githubGetFile,
  githubCreateOrUpdateFile,
  readLocal,
  writeLocal,
  LOCAL_PATH,
};
