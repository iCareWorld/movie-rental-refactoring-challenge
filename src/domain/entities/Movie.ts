import { Price } from '../pricing/Price'

export class Movie {
    constructor(public readonly title: string, private price: Price) {}

    getCharge(daysRented: number): number {
        return this.price.getCharge(daysRented)
    }

    getFrequentRenterPoints(daysRented: number): number {
        return this.price.getFrequentRenterPoints(daysRented)
    }
}