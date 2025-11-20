const config = require('../settings');
const { cmd } = require('../lib/command');
const yts = require('yt-search');

cmd({
    pattern: "video2",
    alias: ["mp4"],
    react: "🎥",
    desc: "Download video from YouTube",
    category: "download",
    use: ".video2 <query or url>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("> *❌ Please provide a video name or YouTube URL!*");

        let videoUrl, title;
        
        // Check if it's a URL
        if (q.match(/(youtube\.com|youtu\.be)/)) {
            videoUrl = q;
            const videoInfo = await yts({ videoId: q.split(/[=/]/).pop() });
            title = videoInfo.title;
        } else {
            // Search YouTube
            const search = await yts(q);
            if (!search.videos.length) return await reply("❌ No results found!");
            videoUrl = search.videos[0].url;
            title = search.videos[0].title;
        }

        await reply("```⏳ 𝐏ʟᴇᴀꜱᴇ 𝐖ᴀɪᴛ...𝐃ᴏᴡɴʟᴏᴀᴅɪɴɢ 𝐘ᴏᴜʀ 𝐕ɪᴅᴇᴏ...```");

        // Use API to get video
        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.success) return await reply("❌ Failed to download video!");

        await conn.sendMessage(from, {
            video: { url: data.result.download_url },
            mimetype: 'video/mp4',
            caption: `🧾 𝚃𝙸𝚃𝙻𝙴 : *${title}*`
        }, { quoted: mek });

        await reply(`✅ 𝐘ᴏᴜʀ 𝐘ᴛ 𝐕ɪᴅᴇᴏ 𝐃ᴏᴡɴʟᴏᴀᴅᴇᴅ 𝐒ᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ...!!!\n\n🧾 𝚃𝙸𝚃𝙻𝙴 : *${title}*\n\n${config.FOOTER}`);

    } catch (error) {
        console.error(error);
        await reply(`❌ Error: ${error.message}`);
    }
          });
