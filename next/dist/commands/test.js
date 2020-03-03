"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../structures/command");
class PingCommand extends command_1.Command {
    constructor() {
        super('test');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(message, args) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const msg = message;
        // BEGINNING OF TEST CODE
        // END OF TEST CODE
    }
}
exports.default = PingCommand;
//# sourceMappingURL=test.js.map