/**
 * Enum defining the available pricing strategy types.
 */
export enum PricingStrategyType {
    REGULAR = "REGULAR",
    CHILDREN = "CHILDREN",
    NEW_RELEASE = "NEW RELEASE"
}

/**
 * Abstract base class for implementing movie rental pricing strategies.
 * 
 * This class follows the Strategy pattern to encapsulate different pricing algorithms
 * for various movie types (regular, children's, new release, etc.).
 * 
 * Each concrete strategy must define its own pricing constants and implement
 * the pricing calculation logic, while inheriting sensible defaults for
 * frequent renter points.
 * 
 * @example
 * ```typescript
 * class RegularPricingStrategy extends PricingStrategy {
 *   protected readonly BASE_PRICE = 2;
 *   
 *   calculatePrice(daysRented: number): number {
 *     // Implementation specific to regular movies
 *   }
 * }
 * ```
 */
export abstract class PricingStrategy {
    public readonly name: string;

    constructor(type: PricingStrategyType) {
        this.name = type;
    }

    /**
     * The base rental price before extra day charges.
     * @example Regular: 2, Children: 1.5, New Release: 0
     */
    protected abstract get basePrice(): number

    /**
     * Number of days included in base price.
     * @example Regular: 2, Children: 3, New Release: 0
     */
    protected abstract get baseDays(): number

    /**
     * Rate per day beyond base period.
     * @example Regular: 1.5, Children: 1.5, New Release: 3
     */
    protected abstract get extraDayRate(): number

    /**
     * Calculates the total rental price for a given number of days.
     * 
     * This method must implement the specific pricing logic for each movie type,
     * typically following the pattern:
     * - Charge the base price for rentals up to BASE_DAYS
     * - Add extra charges for each day beyond the base period
     * 
     * @param daysRented The number of days the movie is being rented
     * @returns The total rental price as a number
     * 
     * @example
     * ```typescript
     * const strategy = new RegularPricingStrategy();
     * const price = strategy.calculatePrice(5); // Returns calculated price for 5-day rental
     * ```
     */
    abstract calculatePrice(daysRented: number): number

    /**
     * Calculates frequent renter points earned for a rental.
     * 
     * Default implementation returns 1 point per rental, which is the standard
     * for most movie types. Override this method only for special cases where
     * bonus points are awarded (e.g., new releases may give extra points for
     * longer rentals).
     * 
     * @param daysRented The number of days the movie is being rented
     * @returns The number of frequent renter points earned (default: 1)
     * 
     * @example
     * ```typescript
     * // Most strategies use the default:
     * const points = strategy.calculateFrequentRenterPoints(3); // Returns 1
     * 
     * // Some strategies override for bonus points:
     * class NewReleasePricingStrategy extends PricingStrategy {
     *   calculateFrequentRenterPoints(daysRented: number): number {
     *     return daysRented > 1 ? 2 : 1; // Bonus point for longer rentals
     *   }
     * }
     * ```
     */
    calculateFrequentRenterPoints(daysRented: number): number {
        return 1
    }
}