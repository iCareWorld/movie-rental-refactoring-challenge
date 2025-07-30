import { RegularPrice, NewReleasePrice, ChildrensPrice } from './Price'

describe('Pricing Strategies', () => {
    describe('RegularPrice', () => {
        const pricing = new RegularPrice()
        
        describe('getCharge', () => {
            it('should charge base price for rentals up to 2 days', () => {
                expect(pricing.getCharge(1)).toBe(2)
                expect(pricing.getCharge(2)).toBe(2)
            })
            
            it('should charge additional for extended rentals', () => {
                expect(pricing.getCharge(3)).toBe(3.5)
                expect(pricing.getCharge(5)).toBe(6.5)
            })

            it('should handle boundary conditions correctly', () => {
                expect(pricing.getCharge(2)).toBe(2)
                expect(pricing.getCharge(3)).toBe(3.5)
            })

            it('should handle very long rentals', () => {
                expect(pricing.getCharge(10)).toBe(14)
                expect(pricing.getCharge(30)).toBe(44)
            })

            it('should handle decimal calculations precisely', () => {
                expect(pricing.getCharge(4)).toBe(5)
                expect(pricing.getCharge(7)).toBe(9.5)
            })
        })
        
        describe('getFrequentRenterPoints', () => {
            it('should always return 1 point', () => {
                expect(pricing.getFrequentRenterPoints(1)).toBe(1)
                expect(pricing.getFrequentRenterPoints(5)).toBe(1)
            })

            it('should return 1 point for any rental duration', () => {
                expect(pricing.getFrequentRenterPoints(0)).toBe(1)
                expect(pricing.getFrequentRenterPoints(100)).toBe(1)
            })
        })
    })
    
    describe('NewReleasePrice', () => {
        const pricing = new NewReleasePrice()
        
        describe('getCharge', () => {
            it('should charge per day rate', () => {
                expect(pricing.getCharge(1)).toBe(3)
                expect(pricing.getCharge(3)).toBe(9)
                expect(pricing.getCharge(5)).toBe(15)
            })

            it('should handle single day rentals', () => {
                expect(pricing.getCharge(1)).toBe(3)
            })

            it('should handle very long rentals', () => {
                expect(pricing.getCharge(10)).toBe(30)
                expect(pricing.getCharge(50)).toBe(150)
            })

            it('should scale linearly with days', () => {
                for (let days = 1; days <= 10; days++) {
                    expect(pricing.getCharge(days)).toBe(days * 3)
                }
            })
        })
        
        describe('getFrequentRenterPoints', () => {
            it('should return 1 point for single day rental', () => {
                expect(pricing.getFrequentRenterPoints(1)).toBe(1)
            })
            
            it('should return 2 points for multi-day rental', () => {
                expect(pricing.getFrequentRenterPoints(2)).toBe(2)
                expect(pricing.getFrequentRenterPoints(5)).toBe(2)
            })

            it('should handle boundary condition at 1 day', () => {
                expect(pricing.getFrequentRenterPoints(1)).toBe(1)
                expect(pricing.getFrequentRenterPoints(2)).toBe(2)
            })

            it('should return 2 points for any rental over 1 day', () => {
                expect(pricing.getFrequentRenterPoints(100)).toBe(2)
            })
        })
    })
    
    describe('ChildrensPrice', () => {
        const pricing = new ChildrensPrice()
        
        describe('getCharge', () => {
            it('should charge base price for rentals up to 3 days', () => {
                expect(pricing.getCharge(1)).toBe(1.5)
                expect(pricing.getCharge(3)).toBe(1.5)
            })
            
            it('should charge additional for extended rentals', () => {
                expect(pricing.getCharge(4)).toBe(3)
                expect(pricing.getCharge(5)).toBe(4.5)
            })

            it('should handle boundary conditions correctly', () => {
                expect(pricing.getCharge(3)).toBe(1.5)
                expect(pricing.getCharge(4)).toBe(3)
            })

            it('should correctly accumulate charges for long rentals', () => {
                expect(pricing.getCharge(6)).toBe(6)
                expect(pricing.getCharge(10)).toBe(12)
            })

            it('should handle decimal calculations precisely', () => {
                expect(pricing.getCharge(7)).toBe(7.5)
                expect(pricing.getCharge(8)).toBe(9)
            })

            it('should verify the original bug fix', () => {
                expect(pricing.getCharge(5)).toBe(4.5)
                expect(pricing.getCharge(5)).not.toBe(3.0)
            })
        })
        
        describe('getFrequentRenterPoints', () => {
            it('should always return 1 point', () => {
                expect(pricing.getFrequentRenterPoints(1)).toBe(1)
                expect(pricing.getFrequentRenterPoints(5)).toBe(1)
            })

            it('should return 1 point for any rental duration', () => {
                expect(pricing.getFrequentRenterPoints(0)).toBe(1)
                expect(pricing.getFrequentRenterPoints(100)).toBe(1)
            })
        })
    })

    describe('Strategy Comparison Edge Cases', () => {
        const regular = new RegularPrice()
        const newRelease = new NewReleasePrice()
        const children = new ChildrensPrice()

        it('should have consistent point calculations', () => {
            expect(regular.getFrequentRenterPoints(10)).toBe(1)
            expect(children.getFrequentRenterPoints(10)).toBe(1)
            
            expect(newRelease.getFrequentRenterPoints(1)).toBe(1)
            expect(newRelease.getFrequentRenterPoints(2)).toBe(2)
        })

        it('should show pricing differences clearly', () => {
            const days = 5
            expect(regular.getCharge(days)).toBe(6.5)
            expect(newRelease.getCharge(days)).toBe(15)
            expect(children.getCharge(days)).toBe(4.5)
            
            expect(newRelease.getCharge(days)).toBeGreaterThan(regular.getCharge(days))
            expect(newRelease.getCharge(days)).toBeGreaterThan(children.getCharge(days))
        })
    })
})