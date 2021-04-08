require('dotenv').config();
const { readdirSync } = require('fs');
const { join, sep } = require('path');
const { Client, Collection, version } = require('discord.js');
const client = new Client();

client.commands = new Collection();
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', file));

	client.commands.set(command.name, command);
}

client.on('ready', () => {
	const statuses = ['online', 'dnd'];
	const colors = ['\x1B[32m', '\x1B[31m'];
	const id = client.shard.ids[0];
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
	console.log(`Shard ID: ${colors[id]}${id}\x1B[0m`);
	client.user.setPresence({
		activity: {
			name: `shard ${id}`,
			type: 'WATCHING'
		},
		status: statuses[id]
	});
});

client.on('message', async msg => {
	const owners = process.env.OWNER.split(',');
	if (process.env.LOCKED === 'TRUE' && !owners.includes(msg.author.id)) return;
	if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

	const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	if (command.ownerOnly && owners.includes(msg.author.id)) return;
	try {
		await command.execute(msg, args);
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
