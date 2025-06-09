/**
 * Represents the pricing and point calculation logic for a specific movie category.
 */
export interface IPriceCode {
    /**
     * The descriptive name of the price code category.
     * @example 'REGULAR', 'NEW_RELEASE', 'CHILDREN'
     */
    get name(): string;
    /**
     * Calculates the rental amount based on the number of days it was rented.
     * @param {number} daysRented The number of days the movie was rented.
     * @returns {number} The total rental cost for the period.
     */
    getAmount(daysRented: number): number;
    /**
     * Calculates the number of frequent renter points earned for a rental.
     * @param {number} daysRented The number of days the movie was rented.
     * @returns {number} The number of frequent renter points awarded.
     */
    getFrequentRenterPoints(daysRented: number): number;
}

/**
 * An abstract base class that provides a default implementation for pricing strategies.
 * @abstract
 * @implements {IPriceCode}
 */
export abstract class PriceCode implements IPriceCode {
    /** @inheritdoc */
    abstract get name(): string;
    /** @inheritdoc */
    abstract getAmount(daysRented: number): number;
    /** @inheritdoc */
    getFrequentRenterPoints(daysRented: number): number {
        return 1;
    }
}

/**
 * A type alias for a class constructor that creates an IPriceCode instance.
 */
export type PriceCodeType = new () => IPriceCode;