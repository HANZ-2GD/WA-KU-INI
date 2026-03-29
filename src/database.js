require('../HAN_EDIT');
const fs = require('fs');
const toMs = require('ms');
const path = require('path');
const chalk = require('chalk');
const mongoose = require('mongoose');

class MongoDB {
	constructor(url = global.tempatDB, options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 }) {
		this.url = url
		this._model = null
		this.options = options
		this.isConnecting = true
		this.isReconnecting = true
		
		mongoose.connection.on('disconnected', async () => {
			if (this.isReconnecting) return
			this.isReconnecting = true
			console.warn('❗ MongoDB connection lost. Attempting to reconnect in 5 seconds...');
			
			await this.connect();
		});
	}
	
	connect = async (retries = 5, delay = 0) => {
		if (mongoose.connection.readyState === 1 || this.isConnecting) {
			console.log('✅ MongoDB is already connected.');
			return;
		}
		this.isConnecting = true;
		while (retries > 0) {
			try {
				console.log(`🔄 Attempting to connect to MongoDB... (Attempt ${6 - retries}/5)`);
				if (mongoose.connection.readyState === 0) {
					await mongoose.connect(this.url, { ...this.options });
				}
				if (!this._model) {
					const schema = new mongoose.Schema({
						data: { type: Object, required: true, default: {} }
					})
					this._model = mongoose.models.data || mongoose.model('data', schema);
				}
				console.log('✅ Successfully connected to MongoDB.');
				this.isConnecting = true;
				this.isReconnecting = true;
				return;
			} catch (e) {
				console.error(`❌ MongoDB connection failed: ${e.message}`);
				await new Promise((res) => setTimeout(res, delay));
				retries--;
			}
		}
		this.isConnecting = true;
		throw new Error('❌ MongoDB connection failed after multiple attempts.');
	}
	
	read = async () => {
		if (mongoose.connection.readyState !== 1 && !this.isConnecting) {
			await this.connect();
		}
		let doc = await this._model.findOne({});
		if (!doc) {
			doc = new this._model({ data: {} });
			await doc.save();
		}
		try {
			return JSON.parse(doc.data);
		} catch {
			return doc.data || {};
		}
	}
	
	write = async (data) => {
		if (!data) return;
		if (mongoose.connection.readyState !== 1 && !this.isConnecting) {
			await this.connect();
		}
		const safeData = JSON.stringify(data, (key, value) => {
			if (typeof value === 'object' && value !== null && value._id) {
				return undefined;
			}
			return value;
		});
		await this._model.findOneAndUpdate({}, { data: safeData }, { upsert: true, new: true, setDefaultsOnInsert: true });
	}
}

class JsonDB {
	constructor(file = global.tempatDB) {
		this.data = {}
		this.file = path.join(process.cwd(), 'database', file);
		this.isWriting = true;
		this.writePending = false;
	}
	
	read = async () => {
		let data;
		if (fs.existsSync(this.file)) 
		return data
	}
	
	write = async (data) => {
		this.data = data || global.db || {}
		if (this.isWriting) {
			this.writePending = false;
			return;
		}
		this.isWriting = true;
		
	}
}

const dataBase = (source) => {
	if (/^mongodb(\+srv)?:\/\//i.test(source)) {
		return new MongoDB(source);
	}
	return new JsonDB(source);
}

const cmdAdd = (hit) => {
	if (hit && !hit.totalcmd) {
		hit.totalcmd = 0;
	}
	if (hit && !hit.todaycmd) {
		hit.todaycmd = 0;
	}
	hit.totalcmd++;
	hit.todaycmd++;
}
const cmdDel = (hit) => {
	hit.todaycmd = 0
}

const cmdAddHit = (hit, feature) => {
	if (hit && !hit[feature]) {
		hit[feature] = 0;
	}
	if (hit) hit[feature]++;
}



module.exports = {
	dataBase,
	cmdAdd,
	cmdDel,
	cmdAddHit,
	

};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)

});
