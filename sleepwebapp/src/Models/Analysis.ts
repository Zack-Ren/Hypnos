import { Diagnostics } from "./Diagnostics"

/**
 * Interface representing the Analysis Schema
 */
export interface Analysis extends Diagnostics {
    windowLength: number,
    sleepPositions: Array<"stomach" | "left-side" | "back" | "right-side">,
    breathingRates: number[],
    sleepPositionFractions: number[],
    alert?: boolean,
}