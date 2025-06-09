import { Movie } from "./movie";

/**
 * Represents a single movie rental by a customer.
 * 
 * It contains informations about the days a movie is rented but forwards the logic 
 * to the associated movie
 * 
 * @property {Movie} movie  The movie that was rented
 * @property {number} daysRented  The duration of the rental in days
 */
export class Rental {

    constructor(readonly movie: Movie, readonly daysRented: number) { }

    /**
     * A convenience getter to access the title of the rented movie directly.
     * @returns {string} The title of the movie.
     */
    get movieTitle() : string {
        return this.movie.title;
    }

    /**
     * Calculates the rental charge for this specific rental by delegating 
     * the actual calculation to the movie`s priceCode
     * @returns {number} The calculated rental cost for this rental.
     */
    getAmount() : number {
        return this.movie.priceCode.getAmount(this.daysRented);
    }

    /**
     * Calculates the frequent renter points earned for this rental by delegating
     * the actual calculation to the movie`s priceCode
     * @returns {number} The number of frequent renter points awarded for this rental.
     */
    getFrequentRenterPoints() : number {
        return this.movie.priceCode.getFrequentRenterPoints(this.daysRented);
    }
    
}