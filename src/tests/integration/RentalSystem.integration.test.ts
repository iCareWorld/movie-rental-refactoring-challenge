import { Store } from '../../infrastructure/Store'

describe('Rental System Integration', () => {
    let store: Store

    beforeEach(() => {
        store = new Store()
        
        store.addMovie('Cinderella', Store.PRICE_CODE_CHILDREN)
        store.addMovie('Star Wars', Store.PRICE_CODE_REGULAR)
        store.addMovie('Gladiator', Store.PRICE_CODE_NEW_RELEASE)
        
        const johnSmith = store.addCustomer('John Smith')
        johnSmith.addRental(store.movies[0]!!, 5)
        johnSmith.addRental(store.movies[1]!!, 5)
        johnSmith.addRental(store.movies[2]!!, 5)
    })

    describe('complete rental workflow', () => {
        it('should handle the original test scenario correctly', () => {
            expect(store.movies).toHaveLength(3)
            expect(store.customers).toHaveLength(1)
            
            const customer = store.customers[0]!
            expect(customer.rentals).toHaveLength(3)
            
            const statement = customer.statement()
            const lines = statement.split('\n')
            const tokens = lines.flatMap(line => line.split('\t'))
            
            expect(tokens[2]).toBe('Cinderella')
            expect(tokens[3]).toBe('4.5')
            expect(tokens[5]).toBe('Star Wars')
            expect(tokens[6]).toBe('6.5')
            expect(tokens[8]).toBe('Gladiator')
            expect(tokens[9]).toBe('15')
        })
        
        it('should demonstrate pricing bug was fixed', () => {
            const childrenMovie = store.movies[0]!
            const customer = store.addCustomer('Test Customer')
            customer.addRental(childrenMovie, 5)
            
            const statement = customer.statement()
            expect(statement).toContain('4.5')
        })
        
        it('should calculate totals correctly across all layers', () => {
            const customer = store.customers[0]!
            
            expect(customer.getTotalCharge()).toBe(26)
            expect(customer.getTotalFrequentRenterPoints()).toBe(4)
            
            const statement = customer.statement()
            expect(statement).toContain('Amount owed is 26')
            expect(statement).toContain('You earned 4 frequent renter points')
        })
    })

    
    describe('Edge Case Integration Scenarios', () => {
        it('should handle empty customer scenario', () => {
            const emptyCustomer = store.addCustomer('Empty Customer')
            const statement = emptyCustomer.statement()
            
            expect(statement).toContain('Rental record for Empty Customer')
            expect(statement).toContain('Amount owed is 0')
            expect(statement).toContain('You earned 0 frequent renter points')
        })

        it('should handle single day rentals across all movie types', () => {
            const singleDayCustomer = store.addCustomer('Single Day Customer')
            singleDayCustomer.addRental(store.movies[0]!, 1) 
            singleDayCustomer.addRental(store.movies[1]!, 1) 
            singleDayCustomer.addRental(store.movies[2]!, 1) 
            
            expect(singleDayCustomer.getTotalCharge()).toBe(6.5)
            expect(singleDayCustomer.getTotalFrequentRenterPoints()).toBe(3)
            
            const statement = singleDayCustomer.statement()
            expect(statement).toContain('Amount owed is 6.5')
            expect(statement).toContain('You earned 3 frequent renter points')
        })

        it('should handle boundary conditions for all pricing thresholds', () => {
            const boundaryCustomer = store.addCustomer('Boundary Customer')
            boundaryCustomer.addRental(store.movies[0]!, 3) 
            boundaryCustomer.addRental(store.movies[1]!, 2) 
            boundaryCustomer.addRental(store.movies[2]!, 1) 
            
            expect(boundaryCustomer.getTotalCharge()).toBe(6.5)
            expect(boundaryCustomer.getTotalFrequentRenterPoints()).toBe(3)
        })

        it('should handle boundary conditions just over thresholds', () => {
            const overBoundaryCustomer = store.addCustomer('Over Boundary Customer')
            overBoundaryCustomer.addRental(store.movies[0]!, 4) 
            overBoundaryCustomer.addRental(store.movies[1]!, 3) 
            overBoundaryCustomer.addRental(store.movies[2]!, 2) 
            
            expect(overBoundaryCustomer.getTotalCharge()).toBe(12.5)
            expect(overBoundaryCustomer.getTotalFrequentRenterPoints()).toBe(4) 
        })

        it('should handle very long rentals', () => {
            const longRentalCustomer = store.addCustomer('Long Rental Customer')
            longRentalCustomer.addRental(store.movies[0]!, 30) 
            longRentalCustomer.addRental(store.movies[1]!, 30) 
            longRentalCustomer.addRental(store.movies[2]!, 30) 
            
            expect(longRentalCustomer.getTotalCharge()).toBe(176)
            expect(longRentalCustomer.getTotalFrequentRenterPoints()).toBe(4) 
        })

        it('should handle multiple customers with complex rental patterns', () => {
            const customer1 = store.addCustomer('Customer 1')
            const customer2 = store.addCustomer('Customer 2')
            const customer3 = store.addCustomer('Customer 3')
            
            
            customer1.addRental(store.movies[0]!, 1)
            customer1.addRental(store.movies[1]!, 1)
            customer1.addRental(store.movies[2]!, 1)
            
            
            customer2.addRental(store.movies[0]!, 3)
            customer2.addRental(store.movies[1]!, 2)
            customer2.addRental(store.movies[2]!, 1)
            
            
            customer3.addRental(store.movies[0]!, 10)
            customer3.addRental(store.movies[1]!, 10)
            customer3.addRental(store.movies[2]!, 10)
            
            expect(store.customers).toHaveLength(4) 
            expect(customer1.getTotalCharge()).toBe(6.5)
            expect(customer2.getTotalCharge()).toBe(6.5)
            expect(customer3.getTotalCharge()).toBe(56) 
        })

        it('should handle same movie rented multiple times by same customer', () => {
            const multiRentalCustomer = store.addCustomer('Multi Rental Customer')
            
            
            multiRentalCustomer.addRental(store.movies[1]!, 1) 
            multiRentalCustomer.addRental(store.movies[1]!, 2) 
            multiRentalCustomer.addRental(store.movies[1]!, 3) 
            multiRentalCustomer.addRental(store.movies[1]!, 10) 
            
            expect(multiRentalCustomer.getTotalCharge()).toBe(21.5)
            expect(multiRentalCustomer.getTotalFrequentRenterPoints()).toBe(4)
            
            const statement = multiRentalCustomer.statement()
            expect(statement.split('\n').filter(line => line.includes('Star Wars'))).toHaveLength(4)
        })

        it('should verify the critical Children pricing bug across integration', () => {
            const bugTestCustomer = store.addCustomer('Bug Test Customer')
            bugTestCustomer.addRental(store.movies[0]!, 5) 
            
            
            expect(bugTestCustomer.getTotalCharge()).toBe(4.5)
            expect(bugTestCustomer.getTotalCharge()).not.toBe(3.0)
            
            const statement = bugTestCustomer.statement()
            expect(statement).toContain('4.5')
            expect(statement).not.toContain('3')
            expect(statement).toContain('Amount owed is 4.5')
        })

        it('should handle decimal precision across the entire system', () => {
            const decimalCustomer = store.addCustomer('Decimal Customer')
            decimalCustomer.addRental(store.movies[0]!, 7) 
            decimalCustomer.addRental(store.movies[1]!, 7) 
            decimalCustomer.addRental(store.movies[2]!, 7) 
            
            expect(decimalCustomer.getTotalCharge()).toBe(38)
            
            const statement = decimalCustomer.statement()
            expect(statement).toContain('7.5')
            expect(statement).toContain('9.5')
            expect(statement).toContain('21')
            expect(statement).toContain('Amount owed is 38')
        })

        it('should handle extreme edge case with zero-day rentals', () => {
            
            const zeroCustomer = store.addCustomer('Zero Customer')
            
            
            
            expect(() => {
                zeroCustomer.addRental(store.movies[0]!, 0)
            }).not.toThrow() 
        })

        it('should demonstrate Clean Architecture layer separation', () => {
            
            const architectureCustomer = store.addCustomer('Architecture Test')
            
            
            expect(store.movies).toHaveLength(3)
            expect(store.customers).toHaveLength(2) 
            
            
            architectureCustomer.addRental(store.movies[0]!, 5)
            expect(architectureCustomer.rentals).toHaveLength(1)
            
            
            expect(architectureCustomer.getTotalCharge()).toBe(4.5)
            expect(architectureCustomer.getTotalFrequentRenterPoints()).toBe(1)
            
            
            const statement = architectureCustomer.statement()
            expect(statement).toContain('Architecture Test')
            
            
            expect(statement).toMatch(/Rental record for.*\n.*Cinderella.*4\.5\n.*Amount owed is 4\.5\n.*You earned 1 frequent renter points/)
        })
    })
})