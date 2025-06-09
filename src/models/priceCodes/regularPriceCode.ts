import { PriceCode } from "./priceCode";

/**
 * Represents the pricing strategy for a Regular category movie.
 * @extends {PriceCode}
 */
export class RegularPriceCode extends PriceCode {
    
    get name(): string {
        return 'REGULAR';
    }

    getAmount(daysRented: number): number {
        let amount = 2;
        if (daysRented > 2) {
            amount += (daysRented - 2) * 1.5;
        }
        return amount;
    }
}