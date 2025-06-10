import { Movie } from "./movie";

export class Rental {
    constructor(public readonly movie: Movie, public readonly daysRented: number) { }

    calculateAmount(): number {
        return this.movie.pricingStrategy.calculatePrice(this.daysRented);
    }

    calculateFrequentRenterPoints(): number {
        return this.movie.pricingStrategy.calculateFrequentRenterPoints(this.daysRented);
    }
}
