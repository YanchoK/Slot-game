"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const configuration_1 = __importDefault(require("./configuration"));
const Reel_1 = require("./Reel");
const AsciiConverter_1 = require("./AsciiConverter");
const PayoutCalculator_1 = require("./PayoutCalculator");
class Slot {
    name;
    credits;
    screen;
    reels;
    constructor(name) {
        this.name = name;
        this.credits = 0;
        this.screen = [];
        this.reels = [];
        for (let i = 0; i < configuration_1.default.reelsCount; i++) {
            this.reels.push(new Reel_1.Reel(i));
        }
    }
    spin(spinsCount = 1, printResult = true, printAscii = true) {
        if (this.credits < spinsCount) {
            console.error("You don't have enough credits!");
            return;
        }
        let totalPayout = 0;
        for (let i = 0; i < spinsCount; i++) {
            const positions = this.generateRandomPositions();
            this.updateTheScreen(positions);
            const payout = PayoutCalculator_1.PayoutCalculator.calculatePayout(this.screen);
            totalPayout += payout;
            if (printResult)
                this.printResult(payout, printAscii);
        }
        return totalPayout;
    }
    loadCredits(money) {
        this.credits = money / configuration_1.default.creditCost;
        console.log(`You have ${this.credits} credits`);
    }
    generateRandomPositions() {
        return this.reels.map((reel) => Math.floor(Math.random() * reel.symbols.length));
    }
    updateTheScreen(positions) {
        const screen = [];
        for (let i = 0; i < configuration_1.default.rowsCount; i++) {
            const row = [];
            for (let j = 0; j < configuration_1.default.reelsCount; j++) {
                const reel = this.reels[j];
                let currentPos = positions[j];
                if (currentPos + i > reel.symbols.length - 1) {
                    currentPos = -i;
                }
                row.push(reel.symbols[currentPos + i]);
            }
            screen.push(row);
        }
        this.screen = screen;
    }
    printResult(payout, printAscii) {
        const stringMatrix = this.screen.map((row) => row.join(" ")).join("\n");
        console.log(stringMatrix);
        console.log(`\nYour payout is ${payout}\n\n`);
        if (printAscii)
            AsciiConverter_1.AsciiConverter.convertToAscii(stringMatrix);
    }
}
exports.Slot = Slot;
