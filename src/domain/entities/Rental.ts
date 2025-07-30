import { Movie } from './Movie'

export class Rental {
    constructor(public readonly movie: Movie, public readonly daysRented: number) {}

    getCharge(): number {
        return this.movie.getCharge(this.daysRented)
    }

    getFrequentRenterPoints(): number {
        return this.movie.getFrequentRenterPoints(this.daysRented)
    }
}