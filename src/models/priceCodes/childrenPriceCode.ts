import { PriceCode } from "./priceCode";

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