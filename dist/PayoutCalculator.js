"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutCalculator = void 0;
const configuration_1 = __importDefault(require("./configuration"));
class PayoutCalculator {
    static calculatePayout(screen) {
        let sum = 0;
        for (let line of configuration_1.default.lines) {
            let symbolsDict = {};
            for (let i = 0; i < line.length; i++) {
                const symbol = screen[line[i]][i];
                if (symbolsDict[symbol]) {
                    symbolsDict[symbol]++;
                }
                else {
                    symbolsDict[symbol] = 1;
                }
            }
            for (let key in symbolsDict) {
                let num = key;
                sum += configuration_1.default.symbols[num][symbolsDict[key] - 1];
                if (symbolsDict[key] > 2) {
                    console.log(`You win from: ${symbolsDict[key]}x${key} = ${configuration_1.default.symbols[num][symbolsDict[key] - 1]} `);
                }
            }
        }
        return sum;
    }
}
exports.PayoutCalculator = PayoutCalculator;
