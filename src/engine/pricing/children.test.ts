import { ChildrensPricingStrategy } from './children'

describe('ChildrensPricingStrategy', () => {
    let strategy: ChildrensPricingStrategy

    beforeEach(() => {
        strategy = new ChildrensPricingStrategy()
    })

    it('should have the correct name', () => {
        expect(strategy.name).toBe('CHILDREN')
    })

    describe('calculatePrice', () => {
        it('should charge $1.50 for rentals up to 3 days', () => {
            expect(strategy.calculatePrice(1)).toBe(1.5)
            expect(strategy.calculatePrice(2)).toBe(1.5)
            expect(strategy.calculatePrice(3)).toBe(1.5)
        })

        it('should charge extra for rentals beyond 3 days', () => {
            expect(strategy.calculatePrice(4)).toBe(1.5)
            expect(strategy.calculatePrice(5)).toBe(3)
            expect(strategy.calculatePrice(7)).toBe(6)
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