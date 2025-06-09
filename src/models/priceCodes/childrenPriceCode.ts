import { PriceCode } from "./priceCode";

/**
 * Represents the pricing strategy for a Children category movie.
 * @extends {PriceCode}
 */
export class ChildrenPriceCode extends PriceCode {

    get name(): string {
        return 'CHILDREN';
    }
    
    getAmount(daysRented: number): number {
        let amount = 1.5;
        if (daysRented > 3) {
            amount = (daysRented - 3) * 1.5;
        }
        return amount;
    }
}