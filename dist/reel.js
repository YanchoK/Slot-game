"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reel = void 0;
const configuration_1 = __importDefault(require("./configuration"));
class Reel {
    constructor(id) {
        this.id = id;
        this.currentPosition = 0;
        this.symbols = configuration_1.default.reels[id];
    }
    id;
    currentPosition;
    symbols;
}
exports.Reel = Reel;
