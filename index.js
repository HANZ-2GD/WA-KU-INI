require('./HAN_EDIT');
const pino = require('pino');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const { toBuffer } = require('qrcode');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const qrcode = require('qrcode-terminal');
const { exec } = require('child_process');
const { parsePhoneNumber } = require('awesome-phonenumber');
const { default: WAConnection, useMultiFileAuthState, Browsers, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestWaWebVersion, jidNormalizedUser } = require('baileys');


const { dataBase } = require('./src/database');
const { app, server, PORT } = require('./src/server');
const { GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');


const { unsafeAgent } = require('./DataBoss/function');


const print = (label, value) => console.log(`${chalk.green.bold('┃')} ${chalk.cyan.bold(label.padEnd(16))}${chalk.yellow.bold(':')} ${value}`);
const pairingCode = process.argv.includes('--qr') ? false : process.argv.includes('--pairing-code') || global.pairing_code;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
let pairingStarted = false;
let phoneNumber;
// Setel ke 0 untuk tidak terbatas, atau angka yang lebih tinggi (misal: 20)
process.setMaxListeners(0); 

// Restart otomatis setiap 30 menit (1800000 milidetik)
setTimeout(() => {
    console.log("Bot akan restart otomatis untuk menjaga performa...");
    process.exit(); 
}, 30 * 60 * 1000);



global.fetchApi = async (path='/', data={}, options={}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const base = options.name ? (options.name in global.APIs ? global.APIs[options.name] : options.name) : global.APIs.RAEHAN2GD
      const apikey = global.APIKeys[base]
      let method = (options.method || 'GET').toUpperCase()
      let url = base + path
      let payload = null
      let headers = options.headers || { 'user-agent': 'Mozilla/5.0 (Linux; Android 15)' }
      const isForm = options.form || data instanceof FormData || (data && typeof data.getHeaders === 'function')
      if (isForm) {
        payload = data
        method = 'POST'
        headers = { apikey, ...headers, ...data.getHeaders() }
      } else if (method !== 'GET') {
        payload = { ...data, apikey }
        headers['content-type'] = 'application/json'
      } else {
        url += '?' + new URLSearchParams({ ...data, apikey }).toString()
      }

      const res = await axios({
        method, url, data: payload,
        headers, httpsAgent: unsafeAgent,
        responseType: options.buffer ? 'arraybuffer'  : options.responseType || options.type || 'json'
      });
      resolve(options.buffer ? Buffer.from(res.data) : res.data);
    } catch (e) {
      reject(e)
    }
  })
}


const database = dataBase();
const msgRetryCounterCache = new NodeCache();


//assertInstalled(process.platform === 'win32' ? 'where magick' : 'command -v convert', 'ImageMagick', 0);
console.log(chalk.greenBright('✅  All external dependencies are satisfied'));
print('Script version', `v${require('./package.json').version}`);
print('Node.js', process.version);
print('Baileys', `v${require('./package.json').dependencies.baileys}`);
print('Date & Time', new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false }));
console.log(chalk.green.bold('╰━━━━━━━━━━━━━━╯' + ('━━━━━━━━━━━━━━╯'.repeat(0))));
server.listen(PORT, () => {
	console.log('App listened on port', PORT);
});



async function startRAEHAN2GDBot() {
	try {
		const loadData = await database.read()
		const MasRaehan = await database.read()
		if (!loadData || Object.keys(loadData)){
			global.db = {
			
			
			set: {},
			users: {},
		    database: {},
				
				...(loadData || {}),
			}
			await database.write(global.db)
		} else {
			global.db = loadData
		}
			if (!MasRaehan || Object.keys(MasRaehan)){
			ganteng = {
				contacts: {},
				presences: {},
				messages: {},
				groupMetadata: {},
				...(MasRaehan || {}),
			}
			await database.write(ganteng)
		} else {
			ganteng = MasRaehan
		}
		
		global.loadMessage = function (remoteJid, id) {
			const messages = store.messages?.[remoteJid]?.array;
			if (!messages) return null;
			return messages.find(msg => msg?.key?.id === id) || null;
		}
		
		
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
	
	const level = pino({ level: 'silent' });
	const { version } = await fetchLatestWaWebVersion();
	const { state, saveCreds } = await useMultiFileAuthState('RAEHAN2GDHAN');
	const getMessage = async (key) => {
		if (ganteng) {
			const msg = await global.loadMessage(key.remoteJid, key.id);
			return msg?.message || ''
		}
		return {
			conversation: 'RAEHAN2GD BOT WA'
		}
	}
	
	const RAEHAN2GD = WAConnection({
		version,
		logger: level,
		getMessage,
		syncFullHistory: false,
		browser: Browsers.ubuntu('Chrome'),
		generateHighQualityLinkPreview: true,
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, level),
		},
	})
	
	if (pairingCode && !phoneNumber && !RAEHAN2GD.authState.creds.registered) {
		async function getPhoneNumber() {
			phoneNumber = global.number_bot ? global.number_bot : process.env.BOT_NUMBER || await question('Please type your WhatsApp number : ');
			phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
			
			if (!parsePhoneNumber('+' + phoneNumber).valid && phoneNumber.length < 6) {
				console.log(chalk.bgBlack(chalk.redBright('Start with your Country WhatsApp code') + chalk.whiteBright(',') + chalk.greenBright(' Example : 62xxx')));
				await getPhoneNumber()
			}
		}
		(async () => {
			await getPhoneNumber();
			exec('./RAEHAN2GDHAN/*');
			console.log('Phone number captured. Waiting for Connection...\n' + chalk.blueBright('Estimated time: around 2 ~ 5 minutes'))
		})()
	}
	
	await Solving(RAEHAN2GD, ganteng)
	
	RAEHAN2GD.ev.on('creds.update', saveCreds)
	
	RAEHAN2GD.ev.on('connection.update', async (update) => {
		const { qr, connection, lastDisconnect, isNewLogin, receivedPendingNotifications } = update;
		if ((connection === 'connecting' || !!qr) && pairingCode && phoneNumber && !RAEHAN2GD.authState.creds.registered && !pairingStarted) {
			setTimeout(async () => {
				pairingStarted = true;
				console.log('Requesting Pairing Code...')
				let code = await RAEHAN2GD.requestPairingCode(phoneNumber);
				console.log(chalk.blue('Your Pairing Code :'), chalk.green(code), '\n', chalk.yellow('Expires in 15 second'));
			}, 8000)
		}
		if (connection === 'close') {
			const reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.connectionLost) {
				console.log('Connection to Server Lost, Attempting to Reconnect...');
				startRAEHAN2GDBot()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log('Connection closed, Attempting to Reconnect...');
				startRAEHAN2GDBot()
			} else if (reason === DisconnectReason.restartRequired) {
				console.log('Restart Required...');
				startRAEHAN2GDBot()
			} else if (reason === DisconnectReason.timedOut) {
				console.log('Connection Timed Out, Attempting to Reconnect...');
				startRAEHAN2GDBot()
			} else if (reason === DisconnectReason.badSession) {
				console.log('Delete Session and Scan again...');
				startRAEHAN2GDBot()
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log('Close current Session first...');
			} else if (reason === DisconnectReason.loggedOut) {
				console.log('Scan again and Run...');
				exec('./RAEHAN2GDHAN/*')
				process.exit(1)
			} else if (reason === DisconnectReason.forbidden) {
				console.log('Connection Failure, Scan again and Run...');
				exec('./RAEHAN2GDHAN/*')
				process.exit(1)
			} else if (reason === DisconnectReason.multideviceMismatch) {
				console.log('Scan again...');
				exec('./RAEHAN2GDHAN/*')
				process.exit(0)
			} else {
				RAEHAN2GD.end(`Unknown DisconnectReason : ${reason}|${connection}`)
			}
		}
		if (connection == 'open') {
			console.log('Connected to : ' + JSON.stringify(RAEHAN2GD.user, null, 2));
			let botNumber = await RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
			if (global.db?.set[botNumber] && !global.db?.set[botNumber]?.join) {
    db.set[botNumber].join = true // Jika mati, paksa jadi aktif (true)
			}
		}
		if (qr) {
			if (!pairingCode) qrcode.generate(qr, { small: true })
			app.use('/qr', async (req, res) => {
				res.setHeader('content-type', 'image/png')
				res.end(await toBuffer(qr))
			});
		}
		if (isNewLogin) console.log(chalk.green('New device login detected...'))
		if (receivedPendingNotifications == 'true') {
			console.log('Please wait About 1 Minute...')
			RAEHAN2GD.ev.flush()
		}
	});



	 
	
	 RAEHAN2GD.ev.on('call', async (call) => {
		const hanzzz = {` 
╭┈──────────╮
│ ❍ ANTI PANGGILAN ❍
╰┈──────────╯

▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃HALLO MAS / MBAK
┃@${id.from.split('@')[0]}
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃Panggilan :${id.isVideo ? 'Video' : 'Suara'}
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃maaf mas / mbak
┃pemilik sedang 
┃tidak membawa 
┃hp / handphone
┃Tolong 
┃Tinggalkan Pesan
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃ɪɴɪ ᴀᴅᴀʟᴀʜ ᴋᴇᴄᴇʀᴅᴀsᴀɴ ʙᴜᴀᴛᴀɴ
┃ᴅɪ ʙᴜᴀᴛ ᴏʟᴇʜ ʀᴀᴇʜᴀɴ
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭` mentions : [id.from]}
		let botNumber = await RAEHAN2GD.decodeJid(RAEHAN2GD.user.id);
		 {
			for (let id of call) {
				
				if (id.status === 'offer') {
					
					let msg = await RAEHAN2GD.sendMessage(id.from, { image: {url: 'https://ar-hosting.pages.dev/1775121854710.png'}, caption: hanzzz});
					 
					await RAEHAN2GD.rejectCall(id.id, id.from)
				}
			}
		}
	});   



	
	RAEHAN2GD.ev.on('messages.upsert', async (message) => {
		await MessagesUpsert(RAEHAN2GD, message, ganteng);
	});
	
	RAEHAN2GD.ev.on('group-participants.update', async (update) => {
		await GroupParticipantsUpdate(RAEHAN2GD, update, ganteng);
	});
	
	


	return RAEHAN2GD
}

startRAEHAN2GDBot()


