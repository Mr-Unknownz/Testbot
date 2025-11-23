const { cmd } = require('../lib/command');
const gis = require("g-i-s");
const {
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  proto,
} = require("@whiskeysockets/baileys");

cmd({
  pattern: "img",
  react: "📸",
  desc: "Google Image Search",
  category: "media"
}, async (socket, msg, args) => {
  try {
    const from = msg.key.remoteJid;
    const query = args.join(" ");
    const pushname = msg.pushName || "there";

    if (!query) {
      return await socket.sendMessage(from, {
        text: `🔍 *Google Image Search*\n\nPlease enter a query!\n\nExample:\n.img cat`,
      }, { quoted: msg });
    }

    gis(query, async (error, result) => {
      if (error || !result || result.length < 12) {
        return await socket.sendMessage(from, {
          text: "❌ Not enough images found. Try another keyword.",
        }, { quoted: msg });
      }

      const img1 = result[0].url;
      const img2 = result[1].url;
      const moreImages = result.slice(2, 12).map(r => r.url);

      const caption =
`╭───────────────⭓ 
│ 👤 Requested by: ${pushname}
│ 🔍 Query: ${query}
│  
│ 📸 Reply:
│  
│ ╭─────────────●●►
│ ├ 🖼️ *1* → Image type
│ ├ 📄 *2* → Document type
│ ├ 🖼️ *3* → 10 more images
│ ╰─────────────●●►
│  
│ ● KING SANDESH MD ●
╰───────────────⭓`;

      const sentMsg = await socket.sendMessage(from, {
        image: { url: img1 },
        caption,
      }, { quoted: msg });

      const results = result.slice(0, 10);
      const cards = [];

      for (let i = 0; i < results.length; i++) {
        const imageUrl = results[i].url;
        const media = await prepareWAMessageMedia(
          { image: { url: imageUrl } },
          { upload: socket.waUploadToServer }
        );

        const header = proto.Message.InteractiveMessage.Header.create({
          ...media,
          title: `📸 Result ${i + 1}: ${query}\n\n👤 Requested by: ${pushname}`,
          gifPlayback: true,
          subtitle: "KING SANDESH MD",
          hasMediaAttachment: false,
        });

        cards.push({
          header,
          body: { text: `\n\n● KING SANDESH MD ●` },
          nativeFlowMessage: {},
        });
      }

      const carouselMessage = generateWAMessageFromContent(
        from,
        {
          viewOnceMessage: {
            message: {
              interactiveMessage: {
                body: { text: "" },
                carouselMessage: {
                  cards,
                  messageVersion: 1
                }
              }
            }
          }
        },
        { quoted: msg }
      );

      await socket.relayMessage(from, carouselMessage.message, {
        messageId: carouselMessage.key.id
      });

      const msgId = sentMsg.key.id;

      const listener = async (update) => {
        try {
          const mek = update.messages?.[0];
          if (!mek?.message) return;

          const isReply = mek.message.extendedTextMessage?.contextInfo?.stanzaId === msgId;
          if (!isReply) return;
          if (mek.key.remoteJid !== from) return;

          const text = mek.message.conversation || mek.message.extendedTextMessage?.text;

          await socket.sendMessage(from, {
            react: { text: "✅", key: mek.key }
          });

          switch (text.trim()) {
            case "1":
              await socket.sendMessage(from, {
                image: { url: img1 },
                caption: `✅ *Here is your image!*\n> KING SANDESH MD`
              }, { quoted: mek });
              break;

            case "2":
              await socket.sendMessage(from, {
                document: { url: img2 },
                mimetype: "image/jpeg",
                fileName: `img_${Date.now()}.jpg`,
                caption: `📄 *Here is your image as document!*\n> KING SANDESH MD`
              }, { quoted: mek });
              break;

            case "3":
              for (let i = 0; i < moreImages.length; i++) {
                await socket.sendMessage(from, {
                  image: { url: moreImages[i] },
                  caption: `🖼️ Extra Image ${i + 1}\n> KING SANDESH MD`
                }, { quoted: mek });

                await new Promise(res => setTimeout(res, 700));
              }
              break;

            default:
              await socket.sendMessage(from, {
                text: "❌ Reply must be: 1 / 2 / 3 only."
              }, { quoted: mek });
              break;
          }

        } catch (err) {
          console.log("Reply Error: ", err);
        }
      };

      socket.ev.on("messages.upsert", listener);

      setTimeout(() => {
        socket.ev.off("messages.upsert", listener);
      }, 2 * 60 * 1000);

    });

  } catch (e) {
    console.log("Main Error:", e);
    await socket.sendMessage(msg.key.remoteJid, {
      text: `⚠️ Error: ${e.message}`
    });
  }
});
