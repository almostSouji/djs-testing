require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const { Client, Collection } = require('discord.js');
const client = new Client();

client.commands = new Collection();
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', file));

	client.commands.set(command.name, command);
}

client.on('ready', () => {
	const statuses = ['online', 'idle'];
	const id = client.shard.ids[0];
	console.log(`${client.user.tag} (${client.user.id}) ready.`);
	client.user.setPresence({
		activity: {
			name: `shard ${id}`,
			type: 'WATCHING'
		},
		status: statuses[id]
	});
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
