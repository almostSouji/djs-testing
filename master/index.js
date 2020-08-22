require('dotenv').config();
const { readdirSync } = require('fs');
const { join, sep } = require('path');
const { Client, Collection } = require('discord.js');
const client = new Client();
const lock = require('./package-lock.json');
const discordJS = lock.dependencies['discord.js'].version;
const hashReg = /(?:tar.gz\/|#)(\w+)/;
const djsHash = discordJS.match(hashReg)[1];

client.commands = new Collection();
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', file));

	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`${client.user.tag} (${client.user.id}) ready.`);
	const parts = __dirname.split(sep);
	const name = `${parts[parts.length - 1]} (${djsHash.slice(0, 6)})`;
	if (client.user.username !== name) {
		console.log(`setting name: ${name}`);
		client.user.setUsername(name);
	}
});

client.on('message', msg => {
	if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

	const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	if (command.ownerOnly && !process.env.OWNER.split(',').includes(msg.author.id)) return;

	try {
		command.execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('error', error => {
	console.error('Websocket Error:', error);
});

client.login(process.env.TOKEN);
