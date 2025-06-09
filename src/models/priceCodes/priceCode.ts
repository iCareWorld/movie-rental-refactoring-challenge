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

export type PriceCodeType = new () => IPriceCode;