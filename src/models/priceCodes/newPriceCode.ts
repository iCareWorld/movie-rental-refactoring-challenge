import { PriceCode } from "./priceCode";

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