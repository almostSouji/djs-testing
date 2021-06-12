const { inspect } = require('util');
const Discord = require('discord.js'); // eslint-disable-line no-unused-vars

module.exports = {
	name: 'eval',
	description: 'eval!',
	aliases: ['ev', 'e', 'eval'],
	ownerOnly: true,
	async execute(msg, args) {
		function clean(text, token) {
			if (typeof text === 'string') {
				text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);

				return text.replace(new RegExp(token, 'gi'), '****');
			}

			return text;
		}
		let evaled;
		try {
			const hrStart = process.hrtime();
			evaled = eval(args.join(' ')); // eslint-disable-line no-eval

			if (evaled instanceof Promise) evaled = await evaled;
			const hrStop = process.hrtime(hrStart);

			let response = '';

			const cleaned = clean(inspect(evaled, { depth: 0 }), msg.client.token);
			if (cleaned.length < 1500) {
				response += `\`\`\`js\n${cleaned}\n\`\`\``;
				response += `• d.js ${Discord.version}`;
				response += ` • Type: \`${typeof evaled}\``;
				response += ` • time taken: \`${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}ms\``;

				if (response.length > 0) {
					return msg.answer(response);
				}
			} else {
				return msg.channel.send({ files: [{ attachment: Buffer.from(cleaned), name: 'eval.js' }] });
			}
		} catch (err) {
			console.error('Eval error:', err);
			return msg.answer(`Error:\`\`\`xl\n${clean(err, msg.client.token)}\n\`\`\``);
		}
	}
};
