import { RegularPricingStrategy } from './regular'

describe('RegularPricingStrategy', () => {
    let strategy: RegularPricingStrategy

    beforeEach(() => {
        strategy = new RegularPricingStrategy()
    })

    it('should have the correct name', () => {
        expect(strategy.name).toBe('REGULAR')
    })

    describe('calculatePrice', () => {
        it('should charge $2.00 for rentals up to 2 days', () => {
            expect(strategy.calculatePrice(1)).toBe(2)
            expect(strategy.calculatePrice(2)).toBe(2)
        })

        it('should charge extra for rentals beyond 2 days', () => {
            expect(strategy.calculatePrice(3)).toBe(3.5)  // $2.00 + (1 * $1.50)
            expect(strategy.calculatePrice(5)).toBe(6.5)  // $2.00 + (3 * $1.50)
            expect(strategy.calculatePrice(7)).toBe(9.5)  // $2.00 + (5 * $1.50)
        })
    })

    describe('calculateFrequentRenterPoints', () => {
        it('should always return 1 point', () => {
            expect(strategy.calculateFrequentRenterPoints(1)).toBe(1)
            expect(strategy.calculateFrequentRenterPoints(5)).toBe(1)
            expect(strategy.calculateFrequentRenterPoints(10)).toBe(1)
        })
    })
})
