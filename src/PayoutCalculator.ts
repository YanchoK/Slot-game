import configuration from "./configuration";

export class PayoutCalculator {
  public static calculatePayout(screen: number[][]): number {
    let sum: number = 0;

    for (let line of configuration.lines) {
      let symbolsDict: { [key: number]: number } = {};

      for (let i = 0; i < line.length; i++) {
        const symbol = screen[line[i]][i];
        if (symbolsDict[symbol]) {
          symbolsDict[symbol]++;
        } else {
          symbolsDict[symbol] = 1;
        }
      }

      for (let key in symbolsDict) {
        let num: keyof typeof configuration.symbols = key as any;
        sum += configuration.symbols[num][symbolsDict[key] - 1];

        if (symbolsDict[key] > 2) {
          console.log(
            `You win from: ${symbolsDict[key]}x${key} = ${configuration.symbols[num][symbolsDict[key] - 1]
            } `
          );
        }
      }
    }

    return sum;
  }
}