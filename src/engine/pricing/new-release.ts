import { PricingStrategy, PricingStrategyType } from "./base"

/**
 * Pricing strategy for new release movies in the rental system.
 * 
 * New releases follow a premium pricing model:
 * - Flat daily rate with no base period discount
 * - Higher price point reflecting the movie's recent release status
 * - Bonus frequent renter points for extended rentals
 * 
 * This pricing strategy maximizes revenue from high-demand new titles
 * while incentivizing customer loyalty through bonus points.
 * 
 * @extends PricingStrategy
 */
export class NewReleasePricingStrategy extends PricingStrategy {
    constructor() { super(PricingStrategyType.NEW_RELEASE) }

    /** No base price - new releases charge per day from day one. */
    protected get basePrice(): number { return 0 }

    /** No base days - all days are charged at the daily rate. */
    protected get baseDays(): number { return 0 }

    /** Premium rate of $3 per day for new release movies. */
    protected get extraDayRate(): number { return 3 }

    /**
     * Calculates rental price for new release movies using flat-rate pricing.
     * 
     * Pricing structure:
     * - $3.00 per day for all rental periods
     * 
     * @param daysRented Number of days the movie is being rented
     * @returns Total rental price in dollars
     */
    calculatePrice(daysRented: number): number {
        return daysRented * this.extraDayRate
    }

    /**
     * Calculates frequent renter points with bonus for extended rentals.
     * 
     * New releases award bonus points to encourage longer rentals:
     * - 1 point for 1-day rentals
     * - 2 points for rentals of 2+ days
     * 
     * @param daysRented Number of days the movie is being rented
     * @returns Number of frequent renter points earned
     */
    calculateFrequentRenterPoints(daysRented: number): number {
        if (daysRented > 1)
            return 2
        else
            return 1
    }
}
