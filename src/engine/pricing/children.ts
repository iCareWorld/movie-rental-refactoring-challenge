import { PricingStrategy, PricingStrategyType } from "./base"

/**
 * Pricing strategy for children's movies in the rental system.
 * 
 * Children's movies follow a family-friendly pricing model:
 * - Lower base price for short rentals (up to 3 days)
 * - Reduced daily rate for extended rentals
 * 
 * This pricing strategy encourages longer rentals for family entertainment
 * by offering better value compared to regular movies for extended viewing periods.
 * 
 * @extends PricingStrategy
 */
export class ChildrensPricingStrategy extends PricingStrategy {
    constructor() { super(PricingStrategyType.CHILDREN) }

    /** Discounted base price of $1.50 for children's movies. */
    protected get basePrice(): number { return 1.5 }

    /** Children's movies include 3 days in the base price. */
    protected get baseDays(): number { return 3 }

    /** $1.50 charge per day beyond the 3-day base period. */
    protected get extraDayRate(): number { return 1.5 }

    /**
     * Calculates rental price for children's movies using family-friendly pricing.
     * 
     * Pricing structure:
     * - Days 1-3: Base price of $1.50
     * - Day 4+: Additional $1.50 per day
     * 
     * @param daysRented Number of days the movie is being rented (must be positive)
     * @returns Total rental price in dollars
     */
    calculatePrice(daysRented: number): number {
        let amount = 0

        if (daysRented > this.baseDays) {
            // Extended rental: charge only for days beyond the base period
            // Example: 5 days = (5-3) * $1.50 = $3.00
            amount += (daysRented - this.baseDays) * this.extraDayRate
        } else {
            // Short rental (1-3 days): flat base price regardless of exact days
            // Example: 1 day = $1.50, 2 days = $1.50, 3 days = $1.50
            amount += this.basePrice
        }

        return amount
    }

    // Note: calculateFrequentRenterPoints() inherited from base class
    // Children's movies use the default implementation (1 point per rental)
}