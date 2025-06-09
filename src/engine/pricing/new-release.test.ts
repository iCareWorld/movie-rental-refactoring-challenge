import { NewReleasePricingStrategy } from './new-release'

describe('NewReleasePricingStrategy', () => {
    let strategy: NewReleasePricingStrategy

    beforeEach(() => {
        strategy = new NewReleasePricingStrategy()
    })

    it('should have the correct name', () => {
        expect(strategy.name).toBe('NEW RELEASE')
    })

    describe('calculatePrice', () => {
        it('should charge $3.00 per day for all rentals', () => {
            expect(strategy.calculatePrice(1)).toBe(3)
            expect(strategy.calculatePrice(2)).toBe(6)
            expect(strategy.calculatePrice(3)).toBe(9)
            expect(strategy.calculatePrice(5)).toBe(15)
            expect(strategy.calculatePrice(7)).toBe(21)
        })
    })

    describe('calculateFrequentRenterPoints', () => {
        it('should return 1 point for 1-day rental', () => {
            expect(strategy.calculateFrequentRenterPoints(1)).toBe(1)
        })

        it('should return 2 points for rentals of 2+ days', () => {
            expect(strategy.calculateFrequentRenterPoints(2)).toBe(2)
            expect(strategy.calculateFrequentRenterPoints(3)).toBe(2)
            expect(strategy.calculateFrequentRenterPoints(5)).toBe(2)
            expect(strategy.calculateFrequentRenterPoints(10)).toBe(2)
        })
    })
})
