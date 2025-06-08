import { Movie } from "./movie";

export class Rental {

    constructor(readonly movie: Movie, readonly daysRented: number) { }

    get movieTitle() : string {
        return this.movie.title;
    }

    getAmount() : number {
        return this.movie.priceCode.getAmount(this.daysRented);
    }

    getFrequentRenterPoints() : number {
        return this.movie.priceCode.getFrequentRenterPoints(this.daysRented);
    }
    
}