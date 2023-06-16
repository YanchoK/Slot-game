import { Slot } from "./Slot";

const slot = new Slot("The Texas Gold Mine");

//Single spin
slot.loadCredits(0.5)
slot.spin();

/*
// simulation script
const spinsCount: number = 10_000;
slot.loadCredits(spinsCount / configuration.creditCost);

// Start the timer
const startTime = performance.now();
const totalPayout: number = slot.spin(spinsCount, false)
// End the timer
const endTime = performance.now();
const executionTime = endTime - startTime;

console.log(`You bet ${spinsCount} credits and won ${totalPayout} credits!`);
console.log(`Execution time: ${executionTime} milliseconds`);
*/