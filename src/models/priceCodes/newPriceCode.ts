import { PriceCode } from "./priceCode";

/**
 * Represents the pricing strategy for a NewRelease category movie.
 * @extends {PriceCode}
 */
export class NewReleasePriceCode extends PriceCode {
    
    get name(): string {
        return 'NEW RELEASE';
    }

    getAmount(daysRented: number): number {
        return daysRented * 3;
    }

    getFrequentRenterPoints(daysRented: number): number {
        return daysRented > 1 ? 2 : 1;
    }
}