import { config } from 'dotenv';
import { resolve, join, sep } from 'path';
import { Client, Collection, version } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from './structures/command';

config({ path: resolve(__dirname, '../.env') });

async function main() {
	const client = new Client();
	client.commands = new Collection<string, Command>();
	const commandFiles = readdirSync(join(__dirname, 'commands'))
		.filter(file => ['.js', '.ts'].some((ending: string) => file.endsWith(ending)));

	for (const file of commandFiles) {
		const mod = await import(join(__dirname, 'commands', file));
		const cmdClass = Object.values(mod).find((d: any) => d.prototype instanceof Command) as any;
		const cmd = new cmdClass();
		client.commands.set(cmd.id, cmd);
	}

	client.on('ready', () => {
		const parts = __dirname.split(sep);
		const name = `${parts[parts.length - 1]} (${version})`;
		if (process.env.LOCKED === 'TRUE') {
			console.log('\x1B[32mready in locked mode (bot only reacts to owners)...\x1B[0m');
		} else {
			console.log('\x1b[31mready in open mode - COMMANDS MAY BE USED BY EVERYONE, UNLESS OWNER ONLY IS SPECIFIED...\x1B[0m');
		}
		console.log(`Client tag: \x1B[34m${client.user?.tag}\x1B[0m`);
		console.log(`Client ID: \x1B[34m${client.user?.id}\x1B[0m`);
		console.log(`Library version: \x1B[34m${name}\x1B[0m`);
		console.log(`Prefix: \x1B[34m${process.env.PREFIX}\x1B[0m`);
	});

	client.on('message', async message => {
		const owners = process.env.OWNER!.split(',');
		if (process.env.LOCKED === 'TRUE' && !owners.includes(message.author.id)) return;
		if (message.partial) await message.fetch();
		if (!message.content.startsWith(process.env.PREFIX!) || message.author.bot) return;

		const args = message.content.slice(process.env.PREFIX!.length).trim().split(/ +/);
		const commandName = args.shift()?.toLowerCase() ?? '';
		const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;
		if (command.ownerOnly && !owners.includes(message.author.id)) return;

		try {
			await command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	});

	process.on('unhandledRejection', async source => {
		if (source instanceof Error) {
			console.error(source);
			process.exit(1);
		}
	});

	client.on('error', (error: Error) => {
		console.error('Websocket Error:', error);
	});

	client.login(process.env.TOKEN);
}

main();
