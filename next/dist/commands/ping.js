"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../structures/command");
class PingCommand extends command_1.Command {
    constructor() {
        super('ping');
    }
    async execute(message) {
        return message.reply('foo');
    }
}
exports.default = PingCommand;
//# sourceMappingURL=ping.js.map