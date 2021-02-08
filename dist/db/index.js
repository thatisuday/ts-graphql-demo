"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const path_1 = __importDefault(require("path"));
const lowdb_1 = __importDefault(require("lowdb"));
// create Node adapter around `db.json`
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const adapter = new FileSync_1.default(path_1.default.resolve(__dirname, '../../jsons/db.json'));
// export database API
exports.db = lowdb_1.default(adapter);
//# sourceMappingURL=index.js.map