
const { readdirSync } = require('fs');
const { Client, Collection } = require('discord.js');
const client = new Client();
const { token: TOKEN, prefix: PREFIX, owner: OWNER } = require('./config/config');

client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


client.on('ready', () => {
	console.log(`${client.user.tag} (${client.user.id}) ready.`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

	const args = msg.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	if (command.ownerOnly && !OWNER.includes(msg.author.id)) return;

	try {
		command.execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

client.login(TOKEN);
