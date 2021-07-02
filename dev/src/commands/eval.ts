import { Command } from '../structures/command';
import { Message, version } from 'discord.js';
import { inspect } from 'util';

export default class PingCommand extends Command {
	public constructor() {
		super('eval', { aliases: ['ev'] });
	}

	private clean(text: string, token: string): string {
		if (typeof text === 'string') {
			text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);

			return text.replace(new RegExp(token, 'gi'), '****');
		}

		return text;
	}

	public async execute(message: Message, args: string[]): Promise<Message | void> {
		/* eslint-disable @typescript-eslint/no-unused-vars */
		const Discord = await import('discord.js');
		/* eslint-enable @typescript-eslint/no-unused-vars */
		let evaled;
		try {
			const hrStart = process.hrtime();
			evaled = eval(args.join(' ')); // eslint-disable-line no-eval

			if (evaled instanceof Promise) evaled = await evaled;
			const hrStop = process.hrtime(hrStart);

			let response = '';

			const cleaned = this.clean(inspect(evaled, { depth: 0 }), message.client.token!);
			if (cleaned.length < 1500) {
				response += `\`\`\`js\n${cleaned}\n\`\`\``;
				response += `• d.js ${version}`;
				response += ` • Type: \`${typeof evaled}\``;
				response += ` • time taken: \`${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}ms\``;

				if (response.length > 0) {
					return message.channel.send(response);
				}
			} else {
				return message.channel.send({ files: [{ attachment: Buffer.from(cleaned), name: 'eval.js' }] });
			}
		} catch (err) {
			console.error('Eval error:', err);
			return message.channel.send(`Error:\`\`\`xl\n${this.clean(err, message.client.token!)}\n\`\`\``);
		}
	}
}
