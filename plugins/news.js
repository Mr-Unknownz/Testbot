// plugins/news.js
const axios = require("axios");
const cheerio = require("cheerio");
const { cmd } = require("../lib/command");
const config = require("../settings");

// 👉 Default browser headers to bypass HiruNews bot protection
const browserHeaders = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
};

async function getLatestFullNews() {
    try {
        // 📰 Fetch home page with browser headers
        const { data } = await axios.get("https://www.hirunews.lk/", {
            headers: browserHeaders
        });

        const $ = cheerio.load(data);
        const firstLink = $(".hnticker_marquee a").first();
        const title = firstLink.text().trim();
        const link = firstLink.attr("href");

        if (!link) return "⚠️ Couldn’t find the latest news link.";

        // 🧾 Fetch article page
        const fullUrl = link.startsWith("http")
            ? link
            : "https://www.hirunews.lk" + link;

        const { data: article } = await axios.get(fullUrl, {
            headers: browserHeaders
        });

        const $$ = cheerio.load(article);
        let body = "";

        $$(".news-content p").each((i, el) => {
            const t = $$(el).text().trim();
            if (t.length > 0) body += t + "\n\n";
        });

        if (!body) body = "⚠️ Couldn’t load full article content.";

        return `🗞️ *${title}*\n\n${body}\n🔗 ${fullUrl}`;
    } catch (err) {
        console.error("❌ Error fetching Hiru news:", err.message);
        return "❌ Error fetching latest news from HiruNews.lk (Blocked / Network Error)";
    }
}

// ────────────────────────────────
// Command definition
// ────────────────────────────────
function startAutoNews(conn) {
    // Manual command
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

    // Auto news system
    if (config.NEWS_GROUP_ID) {
        const interval = config.NEWS_INTERVAL || 5 * 60 * 1000; // 5 minutes

        setInterval(async () => {
            try {
                const msg = await getLatestFullNews();
                if (conn && config.NEWS_GROUP_ID) {
                    await conn.sendMessage(config.NEWS_GROUP_ID, { text: msg });
                    console.log("📰 Auto news sent successfully.");
                }
            } catch (err) {
                console.error("❌ Auto-news error:", err.message);
            }
        }, interval);
    }
}

module.exports = { startAutoNews };
