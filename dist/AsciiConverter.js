"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsciiConverter = void 0;
const axios_1 = __importDefault(require("axios"));
class AsciiConverter {
    static convertToAscii(text) {
        const apiUrl = "https://www.texttoascii.com/api/figlet";
        const style = "Electronic";
        axios_1.default
            .post(apiUrl, { style, text })
            .then((response) => {
            console.log(response.data);
        })
            .catch((error) => {
            console.error(error);
        });
    }
}
exports.AsciiConverter = AsciiConverter;
