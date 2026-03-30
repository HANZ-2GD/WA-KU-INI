

/*
▬▭▬▭▬▭▬▭▬▬▭▬▭




SCRIPT BY HANZ
INSTA: @hanz_932



▬▭▬▭▬▭▬▭▬▬▭▬▭



*/
//▬▭▬▭▬▭▬▭▬▬▭▬( KONSTAN )▭▬▭▬▭▬▭▬▭▬▬▭▬▭

require('./HAN_EDIT');
const fs = require('fs');
const util = require('util');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const yts = require('yt-search');
const cron = require('node-cron');
const fetch = require('node-fetch');
const FileType = require('file-type');
const { Chess } = require('chess.js');
const { Akinator } = require('aki-api');
const FormData = require('form-data');
const webp = require('node-webpmux');
const speed = require('performance-now');
const moment = require('moment-timezone');
const { performance } = require('perf_hooks');
const PhoneNum = require('awesome-phonenumber');
const { exec, spawn, execSync } = require('child_process');
const { generateWAMessageContent, getContentType } = require('baileys');
	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////


	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
const { LoadDataBase } = require('./src/message');
const settingsPath = path.join(__dirname, 'HAN_EDIT.js');
const { getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, formatDate, formatp, generateProfilePicture, errorCache, normalize, updateSettings, parseMention, fixBytes, similarity, pickRandom, tarBackup } = require('./DataBoss/function');
	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////


module.exports = RAEHAN2GD = async (RAEHAN2GD, m, msg, store) => {
	await LoadDataBase(RAEHAN2GD, m);
const botNumber = RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
const set = db.set[botNumber]
const ownerNumber = set.owner = [...new Set([...owner, botNumber.split('@')[0], ...set?.owner || []])];
try {
		
	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

		
		const body = ((m.type === 'conversation') ? m.message.conversation :
		(m.type == 'imageMessage') ? m.message.imageMessage.caption :
		(m.type == 'videoMessage') ? m.message.videoMessage.caption :
		(m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
		(m.type == 'reactionMessage') ? m.message.reactionMessage.text :
		(m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
		(m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
		(m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
		(m.type == 'interactiveResponseMessage'  && m.quoted) ? (m.message.interactiveResponseMessage?.nativeFlowResponseMessage ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : '') :
		(m.type == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || '') :
		(m.type == 'editedMessage') ? (m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || '') :
		(m.type == 'protocolMessage') ? (m.message.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.protocolMessage?.editedMessage?.conversation || m.message.protocolMessage?.editedMessage?.imageMessage?.caption || m.message.protocolMessage?.editedMessage?.videoMessage?.caption || '') : '') || '';	
		const budy = (typeof m.text == 'string' ? m.text : '')
		const isCreator = isOwner = ownerNumber.filter(v => typeof v === 'string').map(v => v.replace(/[^0-9]/g, '')).includes(m.sender.split('@')[0])
		const prefix = isCreator ? (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : listprefix.find(a => body?.startsWith(a)) || '') : set.multiprefix ? (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : listprefix.find(a => body?.startsWith(a)) || '¿') : listprefix.find(a => body?.startsWith(a)) || '¿'
		
	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
		
		const isCmd = body.startsWith(prefix)
		const args = body.trim().split(/ +/).slice(1)
		const quoted = m.quoted ? m.quoted : m
		const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
		const text = q = args.join(' ')
		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
		
		
	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
		
		
		
		const hari = moment.tz('Asia/Jakarta').locale('id').format('dddd');
		const tanggal = moment.tz('Asia/Jakarta').locale('id').format('DD/MM/YYYY');		
		const jamjak = moment.tz('Asia/Jakarta').locale('id').format('HH:mm:ss');
		const jammak = moment.tz('Asia/Makassar').locale('id').format('HH:mm:ss');
		const jamjay = moment.tz('Asia/Jayapura').locale('id').format('HH:mm:ss');
		
	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
		
		
		
		
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
process.once('uncaughtException', console.error)
process.once('unhandledRejection', console.error)
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭

if (!isCreator) {
if ((set.grouponly === set.privateonly)) {
if (!RAEHAN2GD.public && !m.key.fromMe) return }
else if (set.grouponly) 
{ if (!m.isGroup) return } else if (set.privateonly) { if (m.isGroup) return }}
//▬▭▬▭▬▭▬▭▬▬▭( AUTO READ )▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
	 	{
			if (isCreator) {
				
				console.log(chalk.black(chalk.bgWhite('[ PESAN ]:'), chalk.bgGreen(new Date), chalk.bgHex('#00EAD3')(budy || m.type), chalk.bgHex('#AF26EB')(m.key.id) + '\n' + chalk.bgCyanBright('[ DARI ] :'), chalk.bgYellow(m.pushName || (isCreator ? 'Bot' : 'Anonim')), chalk.bgHex('#FF449F')(m.sender), chalk.bgHex('#FF5700')(m.isGroup ? m.metadata.subject : m.chat.endsWith('@newsletter') ? 'Newsletter' : 'Private Chat'), chalk.bgBlue('(' + m.chat + ')')));
			}
		}

	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	        
	        
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
			if (m.isBot) return
		if (db.users[m.sender]?.ban && !isCreator) return
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭

	        ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	        
	        
	{
		
// const keepRecording = setInterval(async () => {
    await RAEHAN2GD.sendPresenceUpdate('recording', m.chat) 
  //  }, );
	

	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
		let fileSha256;
		if (m.isMedia && m.msg.fileSha256 && db.cmd && (m.msg.fileSha256.toString('base64') in db.cmd)) {
			let hash = db.cmd[m.msg.fileSha256.toString('base64')]
			fileSha256 = hash.text
		}
		
		
		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
switch(fileSha256 || command) {
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
case 'setppgchanz': {
				if (!m.isGroup) return m.reply(mess.group)
				
				if (!m.quoted) return m.reply('Reply Gambar yang mau dipasang di Profile Bot')
				if (!/image/.test(quoted.type)) return m.reply(`Reply Image Dengan Caption ${prefix + command}`)
				let media = await quoted.download();
				let { generateProfilePicture } = require("./DataBoss/lib/myfunc")
				let { img } = await generateProfilePicture(media, text.length > 0 ? null : 512)
				await RAEHAN2GD.query({
					tag: 'iq',
					attrs: {
						target: m.chat,
						to: '@s.whatsapp.net',
						type: 'set',
						xmlns: 'w:profile:picture'
					},
					content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
				});
				m.reply('𝙎𝙪𝙠𝙨𝙚𝙨 𝙈𝙖𝙨𝙨')
			}
			break
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////


			case 'setpphanz': {
				if (!isCreator) return m.reply(mess.owner)
				if (!/image/.test(quoted.type)) return m.reply(`Reply Image Dengan Caption ${prefix + command}`)
				
				let media = await quoted.download();
				let { generateProfilePicture } = require("./DataBoss/lib/myfunc")
				let { img } = await generateProfilePicture(media, text.length > 0 ? null : 512)
				await RAEHAN2GD.query({
					tag: 'iq',
					attrs: {
						to: '@s.whatsapp.net',
						type: 'set',
						xmlns: 'w:profile:picture'
					},
					content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
				});
				m.reply('𝙎𝙪𝙠𝙨𝙚𝙨 𝙈𝙖𝙨𝙨')
			}
			
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

		const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

async function uploadFakeReshareStatus(sock, imagePath, originalPosterNumber, captionText) {
    // 1. Identitas "Penyebut" (Orang yang seolah-olah mention kamu)
    const participant = `${originalPosterNumber}@s.whatsapp.net`;

    // 2. Kirim pesan ke status@broadcast
    await sock.sendMessage('status@broadcast', {
        image: { url: imagePath }, // Gambar story-mu
        caption: captionText,
        contextInfo: {
            // Bagian "Fake" Reshare: Menambahkan kutipan pesan
            quotedMessage: {
                extendedTextMessage: {
                    text: "Menyebut Anda dalam cerita", // Teks seolah mention
                    canWaitInternal: true
                }
            },
            participant: participant, // Nomor orang yang "mention"
            remoteJid: 'status@broadcast',
            forwardingScore: 1,
            isForwarded: false 
        }
    }, {
        // Daftar JID yang bisa melihat status (kosongkan jika ingin sesuai privasi default)
        statusJidList: [] 
    });

    console.log("Status Fake Reshare berhasil diunggah!");
			}

		// Contoh penggunaan dalam command bot
// Contoh penggunaan dalam command bot
case 'upfake': {
    const img = './media/story.jpg'; // Path gambar story
    const target = '628123456789'; // Nomor orang yang seolah mention kamu
    const teks = 'Keren banget, makasih ya!'; // Caption story-mu
    
    await uploadFakeReshareStatus(sock, img, target, teks); }
    break
																				   }
		
		/*case 'insta' : case 'instagram' :  {
			const hanzzz =`
        
		https://www.instagram.com/hanz_932?igsh=Ymp6dTNjYzhtODFq`
		RAEHAN2GD.sendMessage(m.chat, { image: {url: 'https://telegra.ph/file/7b8b904ecabdbe0744635.jpg'}, 
caption: hanzzz })}
		break*/



		
			// Menu
			
			case 'hanz' :  { //m.reply (
			const hanzzz =
			`
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃◎ ßÖ† WHÄ†§Äþþ ᵣₐₑₕₐₙ
┃◎ 𝐎𝐰𝐧𝐞𝐫 : ${m.pushName ? m.pushName : 'Tanpa Nama'}
┃◎ 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 : @${m.sender.split('@')[0]}
┃◎ ${RAEHAN2GD.public ? 'Public' : 'Self'}
┃    
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃╔════[ ꪶ⸸⁶⁶⁶𝕄𝔼ℕ𝕌⁶⁶⁶⸸ꫂ͢ ]═⊱
┃╠➤ s̴e̴t̴p̴p̴h̴a̴n̴z̴ ➢
┃╠➤ s̴e̴t̴p̴p̴g̴c̴h̴a̴n̴z̴ ➢
┃╠➤ t̴o̴p̴t̴v̴ ➢
┃╚════[ ꪶ⸸⁹⁹⁹𝐇𝐀𝐍𝐙⁹⁹⁹⸸ꫂ͢ ]═⊱
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃ 
┃   🄸🄽🅂🅃🄰🄶🅁🄰🄼
┃          @hanz_932
┃ 
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃ ╭━━━━━━━━━━━━╾•
┃ │⃟•╾ ◎ ʜᴀʀɪ : ${hari}
┃ │⃟•╾ ◎ ᴛɢʟ  : ${tanggal}
┃ │⃟•━━━━━━━━━━━╾•
┃ │⃟•╾ ◎ ᴊᴀᴍ   ${jamjak} WIB
┃ │⃟•╾ ◎ ᴊᴀᴍ   ${jammak} WITA
┃ │⃟•╾ ◎ ᴊᴀᴍ   ${jamjay} WIT
┃ ╰━━━━━━━━━━━━━╯
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭` // ) }
RAEHAN2GD.sendMessage(m.chat, { image: {url: 'https://telegra.ph/file/7b8b904ecabdbe0744635.jpg'}, 
"contextInfo": {
"externalAdReply": {
"title": `⏤͟͟͞ℍ𝔸ℕℤ`,
"previewType": "PHOTO",
"showAdAttribution": true,
"sourceUrl": `https://on.soundcloud.com/3tNTEb7qIj9LYZvLxc`,
"thumbnailUrl": `https://telegra.ph/file/e6a4267a437b6129a5f1c.jpg`
}}, caption: hanzzz })
}







break

	
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
					
							
											
			case 'toptv': {
				if (!/video/.test(mime)) return m.reply(`Kirim/Reply Video Yang Ingin Dijadikan PTV Message Dengan Caption ${prefix + command}`)
				if ((m.quoted ? m.quoted.type : m.type) === 'videoMessage') {
					const anu = await quoted.download()
					const message = await generateWAMessageContent({ video: anu }, { upload: RAEHAN2GD.waUploadToServer })
					await RAEHAN2GD.relayMessage(m.chat, { ptvMessage: message.videoMessage }, {})
				} else m.reply('Reply Video Yang Mau Di Ubah Ke PTV Message!')
			}
			
			
			
	break   		
		
			
			
			
			
			
			
	






	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	    
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	    
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
			

			default:
			if (budy.startsWith('>')) {
				if (!isCreator) return
				try {
					let evaled = await eval(budy.slice(2))
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					await m.reply(evaled)
				} catch (err) {
					await m.reply(String(err))
				}
			}
			if (budy.startsWith('<')) {
				if (!isCreator) return
				try {
					let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					await m.reply(evaled)
				} catch (err) {
					await m.reply(String(err))
				}
			}
			if (budy.startsWith('$')) {
				if (!isCreator) return
				if (!text) return
				exec(budy.slice(2), (err, stdout) => {
					if (err) return m.reply(`${err}`)
					if (stdout) return m.reply(stdout)
				})
			}
			
			if ((!isCmd || isCreator) && budy.toLowerCase() != undefined) { 
				
				if (!(budy.toLowerCase() in db.database)) return
				await RAEHAN2GD.relayMessage(m.chat, db.database[budy.toLowerCase()], {})
			}
}
	} catch (e) {
		console.log(e);
		if (e?.message?.includes('No sessions')) return;
		const errorKey = e?.code || e?.name || e?.message?.slice(0, 100) || 'unknown_error';
		const now = Date.now();
		if (!errorCache[errorKey]) errorCache[errorKey] = [];
		errorCache[errorKey] = errorCache[errorKey].filter(ts => now - ts < 600000);
		if (errorCache[errorKey].length >= 3) return;
		errorCache[errorKey].push(now);
		m.reply('Error: ' + (e?.name || e?.code || e?.output?.statusCode || e?.status || 'Tidak diketahui') + '\nLog Error Telah dikirim ke Owner\n\n')
		return RAEHAN2GD.sendFromOwner(ownerNumber, `MAS INI ERORR\n\nVersion : *${require('./package.json').version}*\n\n*Log error:*\n\n` + util.format(e), m, { contextInfo: { isForwarded: true }})
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)

}); 
