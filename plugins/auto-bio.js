const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const { cmd } = require("../lib/command");
const config = require("../settings/settings.json");

const lifeQuotes = [
  // English Quotes
  "💖 The only way to do great work is to love what you do.",
  "🌟 Strive not to be a success, but rather to be of value.",
  "🧠 The mind is everything. What you think, you become.",
  "🚀 Believe you can and you're halfway there.",
  "🌌 The future belongs to those who believe in their dreams.",
  "⏳ It is never too late to be what you might have been.",
  "🔥 Make the iron hot by striking!",
  "🎨 The best way to predict the future is to create it.",
  "👣 The journey of a thousand miles begins with one step.",
  "😊 Happiness comes from your own actions.",
  "🖤 Always King In The Game.",
  "😏 I am the Artist Who Paints My Life.",
  "☸ I Am Believe In Karma.",
  "⚡ I don’t wait for opportunities, I create them.",
  "🎯 Focus on goals, not obstacles.",
  "🌹 Silence is better than unnecessary drama.",
  "👑 Born to express, not to impress.",
  "🔥 Hustle in silence, let success make the noise.",
  "🌈 Every day is a new beginning, take a deep breath and start again.",
  "🦅 Fly high, no limits.",
  "💎 Pressure creates diamonds, never give up.",
  "🌊 Go with the flow but never forget your goals.",
  "☠️ I fear none, I respect all.",
  "⚔️ Warriors are not born, they are built.",
  "📌 Success is not for the lazy.",
  "🕊️ Peace over everything.",
  "🌍 Be the reason someone smiles today.",
  "🔥 Pain changes people, but it also makes them stronger.",

  // Sinhala Styled Quotes
  "🤌 ❬❬ ද̅රා͜ගැනි͢මේ̅ සී͜මාව͢ ඉ͜ක්ම͢වූ̅ පසු මිනි͢සා͜ ප්‍ර͢තිනිර්͜මාණය̅ වීම͢ ආ͜රම්භ̅ වේ ❭❭",
  "❤️ ❬❬ පත͢පුු͜ මිනි͢ස්සුම͜ හ͢මු උ͜නු̅ දාට͢ ප්‍රේම͜ය හ͢රි සු͜න්දර͢ වෙයි ❭❭",
  "👊 ❬❬ ඔව්͜ මං̅ වෙ͢නයි̅ බං ම͢ගෙ ව͜ර්ගෙන්͢ එකයි̅ බං ❭❭",
  "😼 ❬❬ කෙ͢ල්ලෙක්͜ දැක්͢කත්͜ බිම͢ බ̸ලං̶ ය͢න එක͜ දැන්͢ පුරු͜ද්දක්̅ වෙලා ❭❭",
  "😐 ❬❬ වත්͢කම්͜ සෙ͢වීමට͜ බැං͢කු͜ ගිණු͢ම් හැ͜රීම͢ පසෙ͜ක ත͢බා͜ මළ͢ පසු͜ මල͢ ගෙද͜රට͢ පැමි͜ණෙනු හම්බ͢කල͜ ධ͢නය අ͜ගේට͢ පෙනෙ͜වි ❭❭",
  "🥵 ❬❬ ඇ͢විස්සෙ͜න්න͢ එපා͜ අවු͢ස්සන͜ එක͢ මේ͜ ගේ͢ම් එ͠කේ͜ම කොට͜සක් ❭❭",
  "🫡 ❬❬ ක̅ව්රු͜ත් දා̅පු ව͜චන ͢තා̅මත් තිය͢න̅වා ඔලුවේ̅ ❭❭"
];

const jsonPath = path.join(__dirname, "autobio.json");
let bioUpdateInterval = null;

// 🔹 Load current status from JSON
const loadStatus = () => {
  if (!fs.existsSync(jsonPath)) return { enabled: false };
  const data = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(data);
};

// 🔹 Save status to JSON
const saveStatus = (status) => fs.writeFileSync(jsonPath, JSON.stringify(status, null, 2));

const updateBio = async (conn) => {
  try {
    const currentTime = moment().tz("Asia/Colombo").format("HH:mm:ss");
    const quote = lifeQuotes[Math.floor(Math.random() * lifeQuotes.length)];
    const newStatus = `✨📸 < | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️ 𝐈𝐬 𝐀ᴄᴛɪᴠᴇ 🟢 | ⏰ ${currentTime} 🇱🇰\n💬 ${quote}`;
    await conn.updateProfileStatus(newStatus);
    console.log("✅ Bio updated:", newStatus);
  } catch (err) {
    console.error("❌ Failed to update bio:", err.message);
  }
};

// 🔹 Start auto bio interval
const startAutoBio = (conn) => {
  if (bioUpdateInterval) clearInterval(bioUpdateInterval);
  bioUpdateInterval = setInterval(() => updateBio(conn), 60000);
  updateBio(conn); // initial run
};

// 🔹 Command to toggle autobio
cmd({
  pattern: "autobio",
  desc: "Enable or disable automatic bio updates with motivational (English + Sinhala) quotes and time.",
  category: "system",
  react: "🧬",
  use: ".autobio",
  filename: __filename,
}, async (conn, mek, m, { reply, isOwner }) => {

  if (!isOwner) return reply("⛔ Only the bot owner can use this command.");
  if (config.AUTO_BIO.toLowerCase() !== "true") return reply("❌ Auto Bio system is disabled in config.");

  const status = loadStatus();

  if (status.enabled) {
    clearInterval(bioUpdateInterval);
    bioUpdateInterval = null;
    saveStatus({ enabled: false });
    return reply("🛑 Auto bio updates have been stopped.");
  } else {
    saveStatus({ enabled: true });
    startAutoBio(m.conn || m);
    return reply("> ✅ Auto bio update enabled..\n\n```Bot bio will update every 1 minute with current time and quotes (English + Sinhala).```");
  }
});

// 🔹 Auto start if JSON has enabled=true
cmd.ev?.on("connection.update", ({ connection }, conn) => {
  const status = loadStatus();
  if (connection === "open" && status.enabled) startAutoBio(conn);
});

module.exports = { startAutoBio };
