import configuration from "./configuration";
import { Reel } from "./Reel";
import { AsciiConverter } from "./AsciiConverter";
import { PayoutCalculator } from "./PayoutCalculator";

export interface ISlot {
  name: string
  spin(): number;
  loadCredits(money: number): void;
}

export class Slot implements ISlot {
  public name: string;
  private credits: number;
  private screen: number[][];
  private reels: Reel[];

  constructor(name: string) {
    this.name = name;
    this.credits = 0;
    this.screen = [];
    this.reels = [];
    for (let i = 0; i < configuration.reelsCount; i++) {
      this.reels.push(new Reel(i));
    }
  }

  public spin(spinsCount: number = 1, printResult: boolean = true, printAscii: boolean = true): any {
    if (this.credits < spinsCount) {
      console.error("You don't have enough credits!");
      return;
    }

    let totalPayout: number = 0;

    for (let i = 0; i < spinsCount; i++) {
      const positions = this.generateRandomPositions();
      this.updateTheScreen(positions);
      const payout = PayoutCalculator.calculatePayout(this.screen);
      totalPayout += payout;
      if (printResult) this.printResult(payout, printAscii);
    }
    return totalPayout;
  }

  public loadCredits(money: number): void {
    this.credits = money / configuration.creditCost;
    console.log(`You have ${this.credits} credits`);
  }

  private generateRandomPositions(): number[] {
    return this.reels.map((reel) =>
      Math.floor(Math.random() * reel.symbols.length)
    );
  }

  private updateTheScreen(positions: number[]): void {
    const screen: number[][] = [];
    for (let i = 0; i < configuration.rowsCount; i++) {
      const row: number[] = [];
      for (let j = 0; j < configuration.reelsCount; j++) {
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

  private printResult(payout: number, printAscii: boolean): void {
    const stringMatrix = this.screen.map((row) => row.join(" ")).join("\n");
    console.log(stringMatrix);
    console.log(`\nYour payout is ${payout}\n\n`);
    if (printAscii) AsciiConverter.convertToAscii(stringMatrix);
  }
}
