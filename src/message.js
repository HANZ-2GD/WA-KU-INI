require('../HAN_EDIT');
const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');
const FileType = require('file-type');
const PhoneNumber = require('awesome-phonenumber');


const { imageToWebp, videoToWebp, writeExif, gifToWebp } = require('../DataBoss/exif');
const { getBuffer, getSizeMedia, fetchJson, sleep, axiosss, fixBytes } = require('../DataBoss/function');
const { jidNormalizedUser, proto, getBinaryNodeChildren, getBinaryNodeChildString, getBinaryNodeChild, generateMessageIDV2, jidEncode, encodeSignedDeviceIdentity, generateWAMessageContent, generateForwardMessageContent, prepareWAMessageMedia, delay, areJidsSameUser, extractMessageContent, generateMessageID, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, toBuffer, getContentType, getDevice } = require('baileys');



async function LoadDataBase(RAEHAN2GD, m) {
	try {
		const botNumber = await RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
		
		
		let user = global.db.users[m.sender] || {};
		let setBot = global.db.set[botNumber] || {};
		
		
		global.db.users[m.sender] = user;
		global.db.set[botNumber] = setBot;
		
		const defaultSetBot = {
			lang: 'id',
			
			public: true,
			anticall: true,
			autotyping: true,
			grouponly: true,
			multiprefix: false,
			privateonly: true,
			didyoumean: true,
			owner: global.owner,
		};
		for (let key in defaultSetBot) {
			if (!(key in setBot)) setBot[key] = defaultSetBot[key];
		};
		
		
	} catch (e) {
		throw e
	}
}

async function MessagesUpsert(RAEHAN2GD, message, masrehan) {
	try {
		let botNumber = await RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
		const msg = message.messages[0];
		const remoteJid = msg.key.remoteJid;
		(masrehan.messages ??= {})[remoteJid] ??= {};
		masrehan.messages[remoteJid].array ??= [];
		masrehan.messages[remoteJid].keyId ??= new Set();
		if (!(masrehan.messages[remoteJid].keyId instanceof Set)) {
			masrehan.messages[remoteJid].keyId = new Set(masrehan.messages[remoteJid].array.map(m => m.key.id));
		}
		if (masrehan.messages[remoteJid].keyId.has(msg.key.id)) return;
		masrehan.messages[remoteJid].array.push(msg);
		masrehan.messages[remoteJid].keyId.add(msg.key.id);
            {
			const removed = masrehan.messages[remoteJid].array.shift();
			masrehan.messages[remoteJid].keyId.delete(removed.key.id);
			}
		if (!masrehan.groupMetadata || Object.keys(masrehan.groupMetadata)) masrehan.groupMetadata ??= await RAEHAN2GD.groupFetchAllParticipating().catch(e => ({}));
		const type = msg.message ? (getContentType(msg.message) || Object.keys(msg.message)[0]) : '';
		const m = await Serialize(RAEHAN2GD, msg, masrehan)
		require('../RAEHAN2GD')(RAEHAN2GD, m, msg, masrehan);
		
	} catch (e) {
		throw e;
		console.log(message);
	}
}

async function Solving(RAEHAN2GD, masrehan) {
	RAEHAN2GD.serializeM = (m) => MessagesUpsert(RAEHAN2GD, m, masrehan)
	
	RAEHAN2GD.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}
	
	RAEHAN2GD.findJidByLid = (lid, masrehan, resolve = false) => {
		const groupMeta = masrehan?.groupMetadata
		if (groupMeta) {
			for (const g of Object.values(groupMeta)) {
				if (!g?.participants) continue
				for (const contact of g.participants) {
					if (contact?.lid === lid && contact?.id) {
						return contact.id
					}
				}
			}
		}
		const contacts = masrehan?.contacts
		if (contacts) {
			for (const contact of Object.values(contacts)) {
				if (contact?.lid === lid && contact?.id) {
					return contact.id
				}
			}
		}
		if (resolve) return lid
		return null
	}
	
	
	
	RAEHAN2GD.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await RAEHAN2GD.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await RAEHAN2GD.getName(i + '@s.whatsapp.net')}\nFN:${await RAEHAN2GD.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.ADR:;;Indonesia;;;;\nitem2.X-ABLabel:Region\nEND:VCARD` //vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await RAEHAN2GD.getName(i + '@s.whatsapp.net')}\nFN:${await RAEHAN2GD.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:whatsapp@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/RAEHAN2GD_dev\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
			})
		}
		RAEHAN2GD.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || masrehan?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 });
	}
	
	
	RAEHAN2GD.relayMessageV2 = async (jid, message, options) => {
		const msg = generateWAMessageFromContent(jid, message, {
			upload: RAEHAN2GD.waUploadToServer,
			messageId: generateMessageID(),
			...options
		});
		const hasil = await RAEHAN2GD.relayMessage(jid, msg.message, {
			messageId: msg.key.id,
			...options
		});
		return hasil;
	}

	RAEHAN2GD.sendPoll = (jid, name = '', values = [], quoted, selectableCount = 1) => {
		return RAEHAN2GD.sendMessage(jid, { poll: { name, values, selectableCount }}, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || masrehan?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 })
	}
	
	
	RAEHAN2GD.sendFromOwner = async (jids, text, quoted, options = {}) => {
		for (const a of jids) {
			await RAEHAN2GD.sendMessage(a.replace(/[^0-9]/g, '') + '@s.whatsapp.net', { text, ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || masrehan?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 })
		}
	}
	
	RAEHAN2GD.sendText = async (jid, text, quoted, options = {}) => RAEHAN2GD.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || masrehan?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 })
	
	RAEHAN2GD.sendAsSticker = async (jid, path, quoted, options = {}) => {
		const buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		const result = await writeExif(buff, options);
		return RAEHAN2GD.sendMessage(jid, { sticker: { url: result }, ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || masrehan?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 });
	}
	
	RAEHAN2GD.downloadMediaMessage = async (message) => {
		const msg = message.msg || message;
		msg.mediaKey = fixBytes(msg.mediaKey);
		msg.fileSha256 = fixBytes(msg.fileSha256);
		msg.fileEncSha256 = fixBytes(msg.fileEncSha256);
		const mime = msg.mimetype || '';
		const messageType = (message.type || mime.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(msg, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		return buffer
	}
	
	RAEHAN2GD.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		const buffer = await RAEHAN2GD.downloadMediaMessage(message);
		const type = await FileType.fromBuffer(buffer);
		
	}
	
	RAEHAN2GD.getFile = async (PATH, save) => {
		let res;
		let filename;
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' }
		
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}
	
	RAEHAN2GD.appendResponseMessage = async (m, text) => {
		let apb = await generateWAMessage(m.chat, { text, mentions: m.mentionedJid }, { userJid: RAEHAN2GD.user.id, quoted: m.quoted && m.quoted.fakeObj(), ephemeralExpiration: m.expiration || m?.metadata?.ephemeralDuration || masrehan?.messages[m.chat]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 });
		apb.key = m.key
		apb.key.id = [...Array(32)].map(() => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');
		apb.key.fromMe = areJidsSameUser(m.sender, RAEHAN2GD.user.id);
		if (m.isGroup) apb.participant = m.sender;
		RAEHAN2GD.ev.emit('messages.upsert', {
			...m,
			messages: [proto.WebMessageInfo.create(apb)],
			type: 'append'
		});
	}
	
	
	
	RAEHAN2GD.sendCarouselMsg = async (jid, body = '', footer = '', cards = [], options = {}) => {
		async function getImageMsg(url) {
			const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: RAEHAN2GD.waUploadToServer });
			return imageMessage;
		}
		const cardPromises = cards.map(async (a) => {
			const imageMessage = await getImageMsg(a.url);
			return {
				header: {
					imageMessage: imageMessage,
					hasMediaAttachment: true
				},
				body: { text: a.body },
				footer: { text: a.footer },
				nativeFlowMessage: {
					buttons: a.buttons.map(b => ({
						name: b.name,
						buttonParamsJson: JSON.stringify(b.buttonParamsJson ? JSON.parse(b.buttonParamsJson) : '')
					}))
				}
			};
		});
		
		const cardResults = await Promise.all(cardPromises);
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({ text: body }),
						footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
						carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
							cards: cardResults,
							messageVersion: 1
						})
					})
				}
			}
		}, {});
		const hasil = await RAEHAN2GD.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
		return hasil
	}
	
	if (RAEHAN2GD.user && RAEHAN2GD.user.id) {
		const botNumber = RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
		if (global.db?.set[botNumber]) {
			RAEHAN2GD.public = global.db.set[botNumber].public
		} else RAEHAN2GD.public = true
	} else RAEHAN2GD.public = true

	return RAEHAN2GD
}



async function Serialize(RAEHAN2GD, msg, masrehan) {
	const botLid = RAEHAN2GD.decodeJid(RAEHAN2GD.user.lid);
	const botNumber = RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
	const m = { ...msg };
	if (!m) return m
	if (m.key) {
		m.id = m.key.id
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isBot = ['HSK', 'BAE', 'B1E', '3EB0', 'B24E', 'WA'].some(a => m.id.startsWith(a) && [12, 16, 20, 22, 40].includes(m.id.length)) || /(.)\1{5,}|[^a-zA-Z0-9]|[^0-9A-F]/.test(m.id) || false
		m.isGroup = m.chat.endsWith('@g.us')
		if (!m.isGroup && m.chat.endsWith('@lid')) m.chat = RAEHAN2GD.findJidByLid(m.chat, masrehan) || m.chat;
		m.sender = RAEHAN2GD.decodeJid(m.fromMe && RAEHAN2GD.user.id || m.key.participant || m.chat || '')
		if (m.isGroup) {
			if (!masrehan.groupMetadata) masrehan.groupMetadata = await RAEHAN2GD.groupFetchAllParticipating().catch(e => ({}));
			let metadata = masrehan.groupMetadata[m.chat] ? masrehan.groupMetadata[m.chat] : (masrehan.groupMetadata[m.chat] = await RAEHAN2GD.groupMetadata(m.chat).catch(e => ({ ...masrehan.groupMetadata[m.chat] })));
			if (!metadata) {
				metadata = await RAEHAN2GD.groupMetadata(m.chat).catch(e => ({ ...masrehan.groupMetadata[m.chat] }));
				masrehan.groupMetadata[m.chat] = metadata
			}
			m.metadata = metadata
			m.metadata.size = (metadata.participants || []).length;
			if (metadata.addressingMode === 'lid') {
				const participant = metadata.participants.find(a => a.lid === m.sender)
				m.key.participant = m.sender = participant?.id || m.sender;
				m.metadata.owner = m.metadata?.participants?.find(p => p.lid === m.metadata.owner)?.id || m.metadata.owner;
				m.metadata.subjectOwner = m.metadata?.participants?.find(p => p.lid === m.metadata.subjectOwner)?.id || m.metadata.subjectOwner;
				masrehan.contacts[m.sender] = { ...masrehan.contacts[m.sender], id: m.sender, lid: m.fromMe && RAEHAN2GD.user.lid || participant?.lid || m.sender, name: m.pushName };
			}
			m.admins = m.metadata.participants ? (m.metadata.participants.reduce((a, b) => (b.admin ? a.push({ id: b.id, admin: b.admin }) : [...a]) && a, [])) : []
			m.isAdmin = m.admins?.some((b) => b.id === m.sender) || false
			m.participant = m.key.participant
			m.isBotAdmin = !!m.admins?.find((member) => [botNumber, botLid].includes(member.id)) || false
		}
	}
	if (m.message) {
		m.type = getContentType(m.message) || Object.keys(m.message)[0]
		m.msg = (/viewOnceMessage|viewOnceMessageV2Extension|editedMessage|ephemeralMessage/i.test(m.type) ? m.message[m.type].message[getContentType(m.message[m.type].message)] : (extractMessageContent(m.message[m.type]) || m.message[m.type]))
		m.body = m.message?.conversation || m.msg?.text || m.msg?.conversation || m.msg?.caption || m.msg?.selectedButtonId || m.msg?.singleSelectReply?.selectedRowId || m.msg?.selectedId || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || m.msg?.name || ''
		m.mentionedJid = m.msg?.contextInfo?.mentionedJid || []
		m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || '';
		m.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.body) ? m.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''
		m.command = m.body && m.body.replace(m.prefix, '').trim().split(/ +/).shift()
		m.args = m.body?.trim().replace(new RegExp("^" + m.prefix?.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&'), 'i'), '').replace(m.command, '').split(/ +/).filter(a => a) || []
		m.device = getDevice(m.id)
		m.expiration = m.msg?.contextInfo?.expiration || m?.metadata?.ephemeralDuration || masrehan?.messages?.[m.chat]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0
		m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 0
		m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath
		if (m.isMedia) {
			m.mime = m.msg?.mimetype
			m.size = m.msg?.fileLength
			m.height = m.msg?.height || ''
			m.width = m.msg?.width || ''
			if (/webp/i.test(m.mime)) {
				m.isAnimated = m.msg?.isAnimated
			}
		}
		m.quoted = m.msg?.contextInfo?.quotedMessage || null
		if (m.quoted) {
			let qMsg = JSON.parse(JSON.stringify(m.msg?.contextInfo?.quotedMessage));
			if (m.msg?.contextInfo?.participant?.endsWith('@lid')) m.msg.contextInfo.participant =  m?.metadata?.participants?.find(a => a.lid === m.msg.contextInfo.participant)?.id || m.msg.contextInfo.participant;
			m.quoted = {
				...qMsg,
				message: extractMessageContent(qMsg) || qMsg,
				type: getContentType(qMsg) || Object.keys(qMsg)[0],
				id: m.msg.contextInfo.stanzaId,
				chat: m.msg.contextInfo.remoteJid || m.chat,
				sender: RAEHAN2GD.decodeJid(m.msg.contextInfo.participant),
				fromMe: RAEHAN2GD.decodeJid(m.msg.contextInfo.participant) === RAEHAN2GD.decodeJid(RAEHAN2GD.user.id),
				text: qMsg?.conversation || qMsg?.caption || '',
			};
			m.quoted.msg = extractMessageContent(qMsg[m.quoted.type]) || qMsg[m.quoted.type];
			m.quoted.device = getDevice(m.quoted.id)
			m.quoted.isBot = m.quoted.id ? ['HSK', 'BAE', 'B1E', '3EB0', 'B24E', 'WA'].some(a => m.quoted.id.startsWith(a) && [12, 16, 20, 22, 40].includes(m.quoted.id.length)) || /(.)\1{5,}|[^a-zA-Z0-9]|[^0-9A-F]/.test(m.quoted.id) : false
			m.quoted.fromMe = m.quoted.sender === RAEHAN2GD.decodeJid(RAEHAN2GD.user.id)
			m.quoted.mentionedJid = m.quoted?.msg?.contextInfo?.mentionedJid || []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.getQuotedObj = async () => {
				if (!m.quoted.id) return null
				let q = await global.loadMessage(m.chat, m.quoted.id, RAEHAN2GD)
				if (q) {
					return await Serialize(RAEHAN2GD, q, masrehan)
				} else {
					return null
				}
			}
			m.quoted.key = {
				remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
				participant: m.quoted.sender,
				fromMe: areJidsSameUser(RAEHAN2GD.decodeJid(m.msg?.contextInfo?.participant), RAEHAN2GD.decodeJid(RAEHAN2GD?.user?.id)),
				id: m.msg?.contextInfo?.stanzaId
			}
			m.quoted.isGroup = m.quoted.chat.endsWith('@g.us')
			m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.quoted.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.quoted.body) ? m.quoted.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.quoted.body) ? m.quoted.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''
			m.quoted.command = m.quoted.body && m.quoted.body.replace(m.quoted.prefix, '').trim().split(/ +/).shift()
			m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
			if (m.quoted.isMedia) {
				m.quoted.fileSha256 = m.quoted[m.quoted.type]?.fileSha256 || ''
				m.quoted.mime = m.quoted.msg?.mimetype
				m.quoted.size = m.quoted.msg?.fileLength
				m.quoted.height = m.quoted.msg?.height || ''
				m.quoted.width = m.quoted.msg?.width || ''
				if (/webp/i.test(m.quoted.mime)) {
					m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
				}
			}
			m.quoted.fakeObj = () => ({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id
				},
				message: m.quoted,
				...(m.isGroup ? { participant: m.quoted.sender } : {})
			});
			m.quoted.download = () => RAEHAN2GD.downloadMediaMessage(m.quoted)
			m.quoted.delete = () => {
				RAEHAN2GD.sendMessage(m.quoted.chat, {
					delete: {
						remoteJid: m.quoted.chat,
						fromMe: m.isBotAdmins ? false : true,
						id: m.quoted.id,
						participant: m.quoted.sender
					}
				})
			}
		}
	}
	
	m.download = () => RAEHAN2GD.downloadMediaMessage(m)
	
	m.copy = () => Serialize(RAEHAN2GD, JSON.parse(JSON.stringify(m)), masrehan)
	
	m.react = (u) => RAEHAN2GD.sendMessage(m.chat, { react: { text: u, key: m.key }})
	
	m.reply = async (content, options = {}) => {
		const { quoted = m, chat = m.chat, caption = '', ephemeralExpiration = m.expiration || m?.metadata?.ephemeralDuration || masrehan?.messages[m.chat]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0, mentions = (typeof content === 'string' || typeof content.text === 'string' || typeof content.caption === 'string') ? [...(content.text || content.caption || content).matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') : [], ...validate } = options;
		if (typeof content === 'object') {
			return RAEHAN2GD.sendMessage(chat, content, { ...options, quoted, ephemeralExpiration })
		} else if (typeof content === 'string') {
			try {
				if (/^https?:\/\//.test(content)) {
					const data = await axios.get(content, { responseType: 'arraybuffer' });
					const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data)).mime
					if (/gif|image|video|audio|pdf|stream/i.test(mime)) {
						return RAEHAN2GD.sendMedia(chat, data.data, '', caption, quoted, content)
					} else {
						return RAEHAN2GD.sendMessage(chat, { text: content, mentions, ...options }, { quoted, ephemeralExpiration })
					}
				} else {
					return RAEHAN2GD.sendMessage(chat, { text: content, mentions, ...options }, { quoted, ephemeralExpiration })
				}
			} catch (e) {
				return RAEHAN2GD.sendMessage(chat, { text: content, mentions, ...options }, { quoted, ephemeralExpiration })
			}
		}
	}

	return m
}

module.exports = {

	
	LoadDataBase,
	MessagesUpsert,
	Solving
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
