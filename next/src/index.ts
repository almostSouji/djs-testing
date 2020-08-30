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
		console.log(`${client.user?.tag} (${client.user?.id}) ready.`);
		const parts = __dirname.split(sep);
		const name = `${parts[parts.length - 2]} (${version})`;
		if (client.user?.username !== name) {
			console.log(`setting name: ${name}`);
			client.user?.setUsername(name);
		}
	});

	client.on('message', async message => {
		if (message.partial) await message.fetch();
		if (!message.content.startsWith(process.env.PREFIX!) || message.author.bot) return;

		const args = message.content.slice(process.env.PREFIX!.length).trim().split(/ +/);
		const commandName = args.shift()?.toLowerCase() ?? '';
		const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;
		if (command.ownerOnly && !process.env.OWNER!.split(',').includes(message.author.id)) return;

		try {
			command.execute(message, args);
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
