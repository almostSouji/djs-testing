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

			response += `\`\`\`js\n${clean(inspect(evaled, { depth: 0 }), msg.client.token)}\n\`\`\``;
			response += `• d.js 12.0.0-dev`;
			response += ` • Type: \`${typeof evaled}\``;
			response += ` • time taken: \`${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}ms\``;

			if (response.length > 0) {
				await msg.channel.send(response);
			}
		} catch (err) {
			console.error('Eval error:', err);
			return msg.channel.send(`Error:\`\`\`xl\n${clean(err, msg.client.token)}\n\`\`\``);
		}
	}
};
