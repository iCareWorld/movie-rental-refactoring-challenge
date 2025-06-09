import { IPriceCode } from "./priceCodes/priceCode";

/**
 * Represents a movie available for rent in the store.
 * @property {string} title  The title of the movie
 * @property {IPriceCode} priceCode  The pricing strategy object that defines how to calculate
 * charges and frequent renter points for this movie.
 */
export class Movie {

    constructor(readonly title: string, readonly priceCode: IPriceCode) { }
}