import { PricingStrategy, PricingStrategyType } from "./base"

/**
 * Pricing strategy for regular movies in the rental system.
 * 
 * Regular movies follow the standard rental pricing model:
 * - Base price covers rentals up to 2 days
 * - Additional daily charges apply for longer rentals
 * 
 * This is the default pricing strategy for most movies in the catalog
 * that are not new releases or children's titles.
 * 
 * @extends PricingStrategy
 */
export class RegularPricingStrategy extends PricingStrategy {
    constructor() { super(PricingStrategyType.REGULAR) }

    /** Base price of $2 for regular movie rentals. */
    protected get basePrice(): number { return 2 }

    /** Regular movies include 2 days in the base price. */
    protected get baseDays(): number { return 2 }

    /** $1.50 charge per day beyond the 2-day base period. */
    protected get extraDayRate(): number { return 1.5 }

    /**
     * Calculates rental price for regular movies.
     * 
     * Pricing structure:
     * - Days 1-2: Base price of $2.00
     * - Day 3+: Additional $1.50 per day
     * 
     * @param daysRented Number of days the movie is being rented
     * @returns Total rental price in dollars
     */
    calculatePrice(daysRented: number): number {
        let amount = this.basePrice

        if (daysRented > this.baseDays) {
            amount += (daysRented - this.baseDays) * this.extraDayRate
        }

        return amount
    }

    // Note: calculateFrequentRenterPoints() inherited from base class
    // Regular movies use the default implementation (1 point per rental)
}
