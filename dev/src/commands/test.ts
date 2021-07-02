import { Command } from '../structures/command';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
	public constructor() {
		super('test');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async execute(message: Message, args: string[]): Promise<Message | void> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const msg = message;
		// BEGINNING OF TEST CODE
		// END OF TEST CODE
	}
}
