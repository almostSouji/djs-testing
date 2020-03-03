"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../structures/command");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
class PingCommand extends command_1.Command {
    constructor() {
        super('eval', { aliases: ['ev'] });
    }
    clean(text, token) {
        if (typeof text === 'string') {
            text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
            return text.replace(new RegExp(token, 'gi'), '****');
        }
        return text;
    }
    async execute(message, args) {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const Discord = await Promise.resolve().then(() => require('discord.js'));
        /* eslint-enable @typescript-eslint/no-unused-vars */
        let evaled;
        try {
            const hrStart = process.hrtime();
            evaled = eval(args.join(' ')); // eslint-disable-line no-eval
            if (evaled instanceof Promise)
                evaled = await evaled;
            const hrStop = process.hrtime(hrStart);
            let response = '';
            response += `\`\`\`js\n${this.clean(util_1.inspect(evaled, { depth: 0 }), message.client.token)}\n\`\`\``;
            response += `• d.js ${discord_js_1.version}`;
            response += ` • Type: \`${typeof evaled}\``;
            response += ` • time taken: \`${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}ms\``;
            if (response.length > 0) {
                return message.channel.send(response);
            }
        }
        catch (err) {
            console.error('Eval error:', err);
            return message.channel.send(`Error:\`\`\`xl\n${this.clean(err, message.client.token)}\n\`\`\``);
        }
    }
}
exports.default = PingCommand;
//# sourceMappingURL=eval.js.map