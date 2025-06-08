export interface IPriceCode {
    get name(): string;
    getAmount(daysRented: number): number;
    getFrequentRenterPoints(daysRented: number): number;
}

export abstract class PriceCode implements IPriceCode {
    abstract get name(): string;
    abstract getAmount(daysRented: number): number;
    getFrequentRenterPoints(daysRented: number): number {
        return 1;
    }
}

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