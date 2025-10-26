const axios = require("axios");
const cheerio = require("cheerio");
const { cmd } = require("../lib/command");
const config = require("../settings");

async function getLatestFullNews() {
  try {
    // 📰 Get latest article link from home page
    const { data } = await axios.get("https://www.hirunews.lk/");
    const $ = cheerio.load(data);
    const firstLink = $(".hnticker_marquee a").first();
    const title = firstLink.text().trim();
    const link = firstLink.attr("href");

    if (!link) return "⚠️ Couldn’t find the latest news link.";

    // 🧾 Fetch full news content from that article page
    const { data: article } = await axios.get(link);
    const $$ = cheerio.load(article);

    let body = "";
    $$(".news-content p").each((i, el) => {
      const t = $$(el).text().trim();
      if (t.length > 0) body += t + "\n\n";
    });

    if (!body) body = "⚠️ Couldn’t load full article content.";

    return `🗞️ *${title}*\n\n${body}\n🔗 ${link}`;
  } catch (err) {
    console.error("❌ Error fetching Hiru news:", err);
    return "❌ Error fetching latest news from HiruNews.lk";
  }
}

// ────────────────────────────────
// Command definition
// ────────────────────────────────
cmd({
  pattern: "news",
  desc: "Get the latest full news from HiruNews.lk",
  category: "news",
  react: "📰",
  filename: __filename,
}, async (conn, mek, m, { reply }) => {
  reply("⏳ Fetching latest Hiru News, please wait...");
  const msg = await getLatestFullNews();
  await conn.sendMessage(m.chat, { text: msg }, { quoted: mek });
});

// ────────────────────────────────
// Auto-send system (every 5 min if enabled)
// ────────────────────────────────
if (config.AUTO_NEWS) {
  setInterval(async () => {
    try {
      const msg = await getLatestFullNews();
      if (global.conn && config.NEWS_GROUP_ID) {
        await global.conn.sendMessage(config.NEWS_GROUP_ID, { text: msg });
        console.log("✅ Auto news sent successfully.");
      }
    } catch (err) {
      console.error("❌ Auto-news error:", err.message);
    }
  }, config.NEWS_INTERVAL);
}
