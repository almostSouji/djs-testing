import { Command } from '../structures/command';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
	public constructor() {
		super('ping');
	}

	public async execute(message: Message): Promise<Message> {
		return message.reply('foo');
	}
}
