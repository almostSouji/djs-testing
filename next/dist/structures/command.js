"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(id, data) {
        var _a, _b, _c;
        this.id = id;
        this.aliases = (_a = data === null || data === void 0 ? void 0 : data.aliases) !== null && _a !== void 0 ? _a : [];
        this.description = (_b = data === null || data === void 0 ? void 0 : data.description) !== null && _b !== void 0 ? _b : '';
        this.ownerOnly = (_c = data === null || data === void 0 ? void 0 : data.ownerOnly) !== null && _c !== void 0 ? _c : true;
    }
}
exports.Command = Command;
//# sourceMappingURL=command.js.map