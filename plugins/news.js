const axios = require("axios");
const cheerio = require("cheerio");
const { cmd } = require("../lib/command");

// ─────────────────────────────────────────
//   Fetch Latest Hiru News Function
// ─────────────────────────────────────────
async function getLatestFullNews() {
  try {
    const { data } = await axios.get("https://www.hirunews.lk/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "Referer": "https://www.google.com/",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
      },
    });

    const $ = cheerio.load(data);

    const link =
      $(".home-lead-new .lead-img-container a").attr("href") ||
      $(".newsCard a").first().attr("href");

    if (!link) return null;

    const fullUrl =
      link.startsWith("http") ? link : "https://www.hirunews.lk" + link;

    const fullPage = await axios.get(fullUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "Referer": "https://www.google.com/",
      },
    });

    const $$ = cheerio.load(fullPage.data);

    return {
      title: $$("h1").first().text().trim(),
      image: $$("meta[property='og:image']").attr("content"),
      body: $$(".news-description").text().trim(),
      url: fullUrl,
    };
  } catch (err) {
    console.error("❌ Error fetching Hiru news:", err.message);
    return null;
  }
}

// ─────────────────────────────────────────
//   BOT COMMAND FOR NEWS
// ─────────────────────────────────────────
cmd(
  {
    pattern: "news",
    desc: "Get full latest news from HiruNews.lk",
    category: "news",
    react: "📰",
    filename: __filename,
  },
  async (conn, mek, m, { reply }) => {
    reply("⏳ *Fetching latest Hiru news...*");

    const news = await getLatestFullNews();

    if (!news) return reply("❌ *Failed to fetch news.*");

    let msg = `📰 *${news.title}*\n\n`;

    if (news.body.length > 10) msg += news.body + "\n\n";

    msg += `🔗 ${news.url}`;

    if (news.image) {
      await conn.sendMessage(
        m.chat,
        { image: { url: news.image }, caption: msg },
        { quoted: mek }
      );
    } else {
      reply(msg);
    }
  }
);

module.exports = {};
