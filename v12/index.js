require('dotenv').config();
const { readdirSync } = require('fs');
const { join, sep } = require('path');
const { Client, Collection, version, Structures, MessageEmbed } = require('discord.js');

Structures.extend('Message', Msg => {
	class Message extends Msg {
		constructor(client, data, channel) {
			super(client, data, channel);
			this.response = null;
		}

		async answer(content, options) {
			if (!this.response?.deleted && this.response?.editable) {
				if (content instanceof MessageEmbed) return this.response.edit('', content);
				if (typeof content === 'string' && !options?.embed) return this.response.edit(content, { embed: null });
				options = this.transformOptions(options);
				return this.response.edit(content, this.transformOptions(options));
			}
			this.response = await this.channel.send(content, options);
			return this.response;
		}

		deleteAnswer() {
			const { response } = this;
			if (response && !response.deleted && response.deletable) {
				response.delete();
			}
		}

		transformOptions(options) {
			const transform = {
				embed: options?.embed ?? null
			};
			if (!options) return transform;
			if (options instanceof Array) {
				for (const addition of options) {
					if (addition instanceof MessageEmbed) transform.embed = addition;
				}
			}
			if (options instanceof MessageEmbed) transform.embed = options;
			if (options instanceof MessageEmbed) transform.embed = options;
			if (options.code) transform.code = options.code;
			if (options.content) transform.content = options.content;
			if (options.allowedMentions) transform.allowedMentions = options.allowedMentions;
			return transform;
		}
	}
	return Message;
});

const client = new Client();

client.commands = new Collection();
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', file));

	client.commands.set(command.name, command);
}

client.on('ready', () => {
	const parts = __dirname.split(sep);
	const name = `${parts[parts.length - 1]} (${version})`;
	if (process.env.LOCKED === 'TRUE') {
		console.log('\x1B[32mready in locked mode (bot only reacts to owners)...\x1B[0m');
	} else {
		console.log('\x1b[31mready in open mode - COMMANDS MAY BE USED BY EVERYONE, UNLESS OWNER ONLY IS SPECIFIED...\x1B[0m');
	}
	console.log(`Client tag: \x1B[34m${client.user.tag}\x1B[0m`);
	console.log(`Client ID: \x1B[34m${client.user.id}\x1B[0m`);
	console.log(`Library version: \x1B[34m${name}\x1B[0m`);
	console.log(`Prefix: \x1B[34m${process.env.PREFIX}\x1B[0m`);
});

async function handleMessage(message) {
	if (message.author.bot) return;
	const owners = process.env.OWNER.split(',');
	if (process.env.LOCKED === 'TRUE' && !owners.includes(message.author.id)) return;
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	if (command.ownerOnly && !owners.includes(message.author.id)) return;

	try {
		await command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.answer('there was an error trying to execute that command!');
	}
}

client.on('message', async msg => handleMessage(msg));
client.on('messageUpdate', (_, n) => handleMessage(n));
client.on('messageDelete', msg => msg.deleteAnswer());

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('error', error => {
	console.error('Websocket Error:', error);
});

client.on('warn', console.log);
client.on('debug', console.log);

client.login(process.env.TOKEN);
