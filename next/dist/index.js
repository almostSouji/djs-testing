"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const command_1 = require("./structures/command");
dotenv_1.config({ path: path_1.resolve(__dirname, '../.env') });
async function main() {
    const client = new discord_js_1.Client();
    client.commands = new discord_js_1.Collection();
    const commandFiles = fs_1.readdirSync(path_1.join(__dirname, 'commands'))
        .filter(file => ['.js', '.ts'].some((ending) => file.endsWith(ending)));
    for (const file of commandFiles) {
        const mod = await Promise.resolve().then(() => require(path_1.join(__dirname, 'commands', file)));
        const cmdClass = Object.values(mod).find((d) => d.prototype instanceof command_1.Command);
        const cmd = new cmdClass();
        client.commands.set(cmd.id, cmd);
    }
    client.on('ready', () => {
        var _a, _b;
        console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} (${(_b = client.user) === null || _b === void 0 ? void 0 : _b.id}) ready.`);
    });
    client.on('message', async (message) => {
        var _a, _b;
        if (message.partial)
            await message.fetch();
        message = message;
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
            return;
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = (_b = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command)
            return;
        if (command.ownerOnly && !process.env.OWNER.split(',').includes(message.author.id))
            return;
        try {
            command.execute(message, args);
        }
        catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    });
    process.on('unhandledRejection', async (source) => {
        if (source instanceof Error) {
            console.error(source);
            process.exit(1);
        }
    });
    client.on('error', (error) => {
        console.error('Websocket Error:', error);
    });
    client.login(process.env.TOKEN);
}
main();
//# sourceMappingURL=index.js.map