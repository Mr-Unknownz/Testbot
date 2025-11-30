const axios = require("axios");
const cheerio = require('cheerio');
const { cmd, commands } = require('../lib/command')
const config = require('../settings/,settings.json');
const {fetchJson} = require('../lib/functions');

const api = `https://nethu-api-ashy.vercel.app`;

cmd({
  pattern: "facebook2",
  react: "🎥",
  alias: ["fbb", "fbvideo2", "fb2"],
  desc: "Download videos from Facebook",
  category: "download",
  use: '.facebook <facebook_url>',
  filename: __filename
},
async(conn, mek, m, {
    from, prefix, q, reply
}) => {
  try {
  if (!q) return reply("> *🚩 Please give me a facebook url*");

  const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);
  
  if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
    return reply("I couldn't find anything :(");
  }

  let caption = `*< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 𝐅ʙ 𝐃ᴏᴡɴʟᴏᴀᴅᴇʀ*

_📝 ᴛɪᴛʟᴇ_ : 𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 𝚅𝙸𝙳𝙴𝙾
_🔗 ᴜʀʟ_ : ${q}`;


  if (fb.result.thumb) {
    await conn.sendMessage(from, {
      image: { url: fb.result.thumb },
      caption : caption,
      }, mek);
  }

    if (fb.result.sd) {
      await conn.sendMessage(from, {
        video: { url: fb.result.sd },
        mimetype: "video/mp4",
        caption: `*𝚂𝙳-𝚀𝚄𝙰𝙻𝙸𝚃𝚈 𝚅𝙸𝙳𝙴𝙾*\n\n${config.FOOTER}`
      }, { quoted: mek });
    }

if (fb.result.hd) {
      await conn.sendMessage(from, {
        video: { url: fb.result.hd },
        mimetype: "video/mp4",
        caption: `*𝙷𝙳-𝚀𝚄𝙰𝙻𝙸𝚃𝚈 𝚅𝙸𝙳𝙴𝙾*\n\n${config.FOOTER}`
      }, { quoted: mek });
    }

} catch (err) {
  console.error(err);
  reply("*Error Available.Trg Again Bro..😒*");
  }
});
