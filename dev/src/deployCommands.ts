import { Snowflake } from 'discord.js';
import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env') });


const client = new Client({ intents: Intents.NON_PRIVILEGED });

client.on('ready', async () => {
	console.log('\x1B[34mCommand deployment starting...\x1B[0m');

	const g = client.guilds.resolve(process.env.DEV_GUILD! as Snowflake);
	if (!g) {
		console.log('\x1b[31mCould not find dev guild!\x1B[0m');
		client.destroy();
		console.log('\x1b[31mClient destroyed.\x1B[0m');
		process.exit(0);
		return;
	}

	const data = [
		{
			name: "ping",
			description: "Replies with pong"
		}
	]

	await g.commands.set(data);


	console.log('\x1B[32mCommand deployment done...\x1B[0m');
	client.destroy();
	console.log('\x1B[32mClient destroyed.\x1B[0m');
	process.exit(0);
})

client.login(process.env.TOKEN!);
