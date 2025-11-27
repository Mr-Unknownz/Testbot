const fs = require("fs");
const config = require("../settings/settings.json");
const { cmd, commands } = require("../lib/command");
const path = require('path');
const axios = require("axios");


cmd({
    pattern: "privacy",
    alias: ["privacymenu"],
    desc: "Privacy settings menu",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let privacyMenu = `╭━━〔 *< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 𝐏ʀɪᴠᴀᴄʏ 𝐒ᴇᴛᴛɪɴɢꜱ ⚙️* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ʙʟᴏᴄᴋʟɪꜱᴛ - 𝚅𝙸𝙴𝚆 𝙱𝙻𝙾𝙲𝙺𝙴𝙳 𝚄𝚂𝙴𝚁𝚂
┃◈┃• ꜱᴇᴛᴘᴘ - 𝚂𝙴𝚃 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 𝙿𝙸𝙲 privacy
┃◈┃• ꜱᴇᴛᴏɴʟɪɴᴇ - Set online 𝙿𝚁𝙸𝚅𝙰𝙲𝚈
┃◈┃• ꜱᴇᴛᴘᴘ - 𝙲𝙷𝙰𝙽𝙶𝙴 𝙱𝙾𝚃'𝚂 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 𝙿𝙸𝙲
┃◈┃• ꜱᴇᴛᴍʏɴᴀᴍᴇ - 𝙲𝙷𝙰𝙽𝙶𝙴 𝙱𝙾𝚃'𝚂 𝙽𝙰𝙼𝙴
┃◈┃• ᴜᴘᴅᴀᴛᴇʙɪᴏ - 𝙲𝙷𝙰𝙽𝙶𝙴 𝙱𝙾𝚃'𝚂 𝙱𝙸𝙾
┃◈┃• ɢʀᴏᴜᴘꜱᴘʀɪᴠᴀᴄʏ - 𝚂𝙴𝚃 𝙶𝚁𝙾𝚄𝙿 𝙰𝙳𝙳 𝙿𝚁𝙸𝚅𝙰𝙲𝚈
┃◈┃• ɢᴇᴛʙɪᴏ - 𝙶𝙴𝚃 𝚄𝚂𝙴𝚁'𝚂 𝙱𝙸𝙾
┃◈┃• ɢᴇᴛᴘᴘ - 𝙶𝙴𝚃 𝚄𝚂𝙴𝚁'𝚂 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 𝙿𝙸𝙲
┃◈┃• ɢᴇᴛᴘʀɪᴠᴀᴄʏ - 𝚅𝙸𝙴𝚆 𝙲𝚄𝚁𝚁𝙴𝙽𝚃 𝙿𝚁𝙸𝚅𝙰𝙲𝚈 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂
┃◈┃
┃◈┃*👇𝐎ᴘᴛɪᴏɴꜱ 𝐅ᴏʀ 𝐏ʀɪᴠᴀᴄʏ 𝐂ʜᴀɴɢᴇ:👇*
┃◈┃• ᴀʟʟ - 𝙴𝚅𝙴𝚁𝚈𝙾𝙽𝙴
┃◈┃• ᴄᴏɴᴛᴀᴄᴛꜱ - 𝙼𝚈 𝙲𝙾𝙽𝚃𝙰𝙲𝚃𝚂 𝙾𝙽𝙻𝚈
┃◈┃• ᴄᴏɴᴛᴀᴄᴛ_ʙʟᴀᴄᴋʟɪꜱᴛ - 𝙲𝙾𝙽𝚃𝙰𝙲𝚃𝚂 𝙴𝚇𝙲𝙴𝙿𝚃 𝙱𝙻𝙾𝙲𝙺𝙴𝙳
┃◈┃• ɴᴏɴᴇ - 𝙽𝙾𝙱𝙾𝙳𝚈
┃◈┃• ᴍᴀᴛᴄʜ_ʟᴀꜱᴛ_ꜱᴇᴇɴ - 𝙼𝙰𝚃𝙲𝙷 𝙻𝙰𝚂𝚃 𝚂𝙴𝙴𝙽
┃◈└───────────┈⊷
╰──────────────┈⊷
*𝙽𝙾𝚃𝙴:* 𝙼𝙾𝚂𝚃 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 𝙰𝚁𝙴 𝙾𝚆𝙽𝙴𝚁-𝙾𝙽𝙻𝚈 ✋.\n\n${config.FOOTER}`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.ALIVE_IMG }, // Replace with privacy-themed image if available
                caption: privacyMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402220977044@newsletter',
                        newsletterName: "< | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 🧚‍♀️",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});


cmd({
    pattern: "blocklist",
    desc: "View the list of blocked users.",
    category: "privacy",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("> *📛 You are not the owner..!*");

    try {
        // Fetch the block list
        const blockedUsers = await conn.fetchBlocklist();

        if (blockedUsers.length === 0) {
            return reply("> *📋 Your block list is empty.*");
        }

        // Format the blocked users with 📌 and count the total
        const list = blockedUsers
            .map((user, i) => `🚧 𝙱𝙻𝙾𝙲𝙺𝙴𝙳 ▸ ${user.split('@')[0]}`) // Remove domain and add 📌
            .join('\n');

        const count = blockedUsers.length;
        reply(`📋 𝐁ʟᴏᴄᴋᴇᴅ 𝐔ꜱᴇʀꜱ 𝐂ᴏᴜɴᴛ 𝐈ꜱ (${count}):\n\n${list}`);
    } catch (err) {
        console.error(err);
        reply(`❌ Failed to fetch block list: ${err.message}`);
    }
});

cmd({
    pattern: "getbio",
    desc: "Displays the user's bio.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const jid = args[0] || mek.key.remoteJid;
        const about = await conn.fetchStatus?.(jid);
        if (!about) return reply("No bio found.");
        return reply(`> *𝚄𝚂𝙴𝚁 𝙱𝙸𝙾 𝙸𝚂* :\n\n${about.status}`);
    } catch (error) {
        console.error("Error in bio command:", error);
        reply("No bio found.");
    }
});
cmd({
    pattern: "setppall",
    desc: "Update Profile Picture Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];  
        
        if (!validValues.includes(value)) {
            return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'.");
        }
        
        await conn.updateProfilePicturePrivacy(value);
        reply(`> *✅ 𝐏ʀᴏꜰɪʟᴇ 𝐏ɪᴄᴛᴜʀᴇ 𝐏ʀɪᴠᴀᴄʏ 𝐔ᴘᴅᴀᴛᴇᴅ 𝐓ᴏ: ${value}*`);
    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});
cmd({
    pattern: "setonline",
    desc: "Update Online Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'match_last_seen'];
        
        if (!validValues.includes(value)) {
            return reply("❌ Invalid option. Valid options are: 'all', 'match_last_seen'.");
        }

        await conn.updateOnlinePrivacy(value);
        reply(`> *✅ 𝐎ɴʟɪɴᴇ 𝐏ʀɪᴠᴀᴄʏ 𝐔ᴘᴅᴀᴛᴇᴅ 𝐓ᴏ: ${value}*`);
    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});

cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "privacy",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");
    try {
        const stream = await downloadContentFromMessage(quoted.message.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const mediaPath = path.join(__dirname, `${Date.now()}.jpg`);
        fs.writeFileSync(mediaPath, buffer);

        // Update profile picture with the saved file
        await conn.updateProfilePicture(conn.user.jid, { url: `file://${mediaPath}` });
        reply("> *🖼️ 𝐏ʀᴏꜰɪʟᴇ 𝐏ɪᴄᴛᴜʀᴇ 𝐔ᴘᴅᴀᴛᴇᴅ 𝐒ᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ..!*");
    } catch (error) {
        console.error("Error updating profile picture:", error);
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

cmd({
    pattern: "setmyname",
    desc: "Set your WhatsApp display name.",
    category: "privacy",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("> *❌ You are not the owner..!*");

    // Ensure you have the display name argument
    const displayName = args.join(" ");
    if (!displayName) return reply("> *❌ Please provide a display name.*");

    try {
        // Ensure the session is loaded before trying to update
        const { state, saveCreds } = await useMultiFileAuthState('path/to/auth/folder');
        const conn = makeWASocket({
            auth: state,
            printQRInTerminal: true,
        });

        conn.ev.on('creds.update', saveCreds);

        // Update display name after connection
        await conn.updateProfileName(displayName);
        reply(`> *✅ 𝐘ᴏᴜʀ 𝐃ɪꜱᴘʟᴀʏ 𝐍ᴀᴍᴇ 𝐇ᴀꜱ 𝐁ᴇᴇɴ 𝐒ᴇᴛ 𝐓ᴏ: ${displayName}*`);
    } catch (err) {
        console.error(err);
        reply("❌ Failed to set your display name.");
    }
});

cmd({
    pattern: "updatebio",
    react: "🥏",
    desc: "Change the Bot number Bio.",
    category: "privacy",
    use: '.updatebio',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply('> 🚫 *You must be an Owner to use this command*');
        if (!q) return reply('> ❓ *Enter the New Bio*');
        if (q.length > 139) return reply('> ❗ *Sorry! Character limit exceeded*');
        await conn.updateProfileStatus(q);
        await conn.sendMessage(from, { text: "> *✔️ 𝐍ᴇᴡ 𝐁ɪᴏ 𝐀ᴅᴅᴇᴅ 𝐒ᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ*" }, { quoted: mek });
    } catch (e) {
        reply('🚫 *An error occurred!*\n\n' + e);
        l(e);
    }
});
cmd({
    pattern: "groupsprivacy",
    desc: "Update Group Add Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];
        
        if (!validValues.includes(value)) {
            return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'.");
        }

        await conn.updateGroupsAddPrivacy(value);
        reply(`> *✅ 𝐆ʀᴏᴜᴘ 𝐀ᴅᴅ 𝐏ʀɪᴠᴀᴄʏ 𝐔ᴘᴅᴀᴛᴇ 𝐓ᴏ: ${value}*`);
    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});

cmd({
    pattern: "getprivacy",
    desc: "Get the bot Number Privacy Setting Updates.",
    category: "privacy",
    use: '.getprivacy',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
        const duka = await conn.fetchPrivacySettings?.(true);
        if (!duka) return reply('🚫 *Failed to fetch privacy settings*');
        
        let puka = `
╭───「 < | 𝐐ᴜᴇᴇɴ 𝐉ᴜꜱᴍʏ 𝐌ᴅ 𝐏ʀɪᴠᴀᴄ𝐘 𝐒ᴛᴀᴛᴜꜱ🧚‍♀️ 」───◆  
│ ∘ _ʀᴇᴀᴅ ʀᴇᴄᴇɪᴘᴛꜱ_ : ${duka.readreceipts}  
│ ∘ _ᴘʀᴏꜰɪʟᴇ ᴘɪᴄᴛᴜʀᴇ_ : ${duka.profile}  
│ ∘ _ꜱᴛᴀᴛᴜꜱ_ : ${duka.status}  
│ ∘ _ᴏɴʟɪɴᴇ_ : ${duka.online}  
│ ∘ _ʟᴀꜱᴛ ꜱᴇᴇɴ_ : ${duka.last}  
│ ∘ _ɢʀᴏᴜᴘ ᴘʀɪᴠᴀᴄʏ_ : ${duka.groupadd}  
│ ∘ _ᴄᴀʟʟ ᴘʀɪᴠᴀᴄʏ_ : ${duka.calladd}  
╰────────────────────`;
        await conn.sendMessage(from, { text: puka }, { quoted: mek });
    } catch (e) {
        reply('🚫 *An error occurred!*\n\n' + e);
        l(e);
    }
});
cmd({
    pattern: "getpp",
    desc: "Fetch the profile picture of a tagged or replied user.",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { quoted, isGroup, sender, participants, reply }) => {
    try {
        // Determine the target user
        const targetJid = quoted ? quoted.sender : sender;

        if (!targetJid) return reply("> *⚠️ Please reply to a message to fetch the profile picture.*");

        // Fetch the user's profile picture URL
        const userPicUrl = await conn.profilePictureUrl(targetJid, "image").catch(() => null);

        if (!userPicUrl) return reply("> *⚠️ No profile picture found for the specified user.*");

        // Send the user's profile picture
        await conn.sendMessage(m.chat, {
            image: { url: userPicUrl },
            caption: `> *🖼️ 𝐇ᴇʀᴇ 𝐈ꜱ 𝐓ʜᴇ 𝐏ʀᴏꜰɪʟᴇ 𝐏ɪᴄᴛᴜʀᴇ 𝐎ꜰ 𝐓ʜᴇ 𝐒ᴘᴇᴄɪꜰɪᴄ 𝐔ꜱᴇʀ.*\n\n${config.FOOTER}`
        });
    } catch (e) {
        console.error("Error fetching user profile picture:", e);
        reply("❌ An error occurred while fetching the profile picture. Please try again later.");
    }
});

          
