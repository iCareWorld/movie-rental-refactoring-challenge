import { Customer } from './Customer'
import { Movie } from './Movie'
import { RegularPrice, NewReleasePrice, ChildrensPrice } from '../pricing/Price'

describe('Customer', () => {
    let customer: Customer
    let regularMovie: Movie
    let newReleaseMovie: Movie
    let childrensMovie: Movie
    
    beforeEach(() => {
        customer = new Customer('John Smith')
        regularMovie = new Movie('Star Wars', new RegularPrice())
        newReleaseMovie = new Movie('Gladiator', new NewReleasePrice())
        childrensMovie = new Movie('Cinderella', new ChildrensPrice())
    })
    
    describe('constructor', () => {
        it('should create customer with name', () => {
            expect(customer.name).toBe('John Smith')
            expect(customer.rentals).toHaveLength(0)
        })

        it('should handle empty name', () => {
            const emptyCustomer = new Customer('')
            expect(emptyCustomer.name).toBe('')
        })

        it('should handle names with special characters', () => {
            const specialCustomer = new Customer('José O\'Brien-Smith Jr.')
            expect(specialCustomer.name).toBe('José O\'Brien-Smith Jr.')
        })

        it('should handle very long names', () => {
            const longName = 'A'.repeat(1000)
            const longCustomer = new Customer(longName)
            expect(longCustomer.name).toBe(longName)
        })
    })
    
    describe('addRental', () => {
        it('should add rental to customer', () => {
            customer.addRental(regularMovie, 5)
            expect(customer.rentals).toHaveLength(1)
            expect(customer.rentals[0]!.movie.title).toBe('Star Wars')
            expect(customer.rentals[0]!.daysRented).toBe(5)
        })

        
        it('should add multiple rentals of same movie', () => {
            customer.addRental(regularMovie, 3)
            customer.addRental(regularMovie, 7)
            expect(customer.rentals).toHaveLength(2)
            expect(customer.rentals[0]!.daysRented).toBe(3)
            expect(customer.rentals[1]!.daysRented).toBe(7)
        })

        it('should handle single day rentals', () => {
            customer.addRental(regularMovie, 1)
            expect(customer.rentals[0]!.daysRented).toBe(1)
        })

        it('should handle very long rentals', () => {
            customer.addRental(regularMovie, 365)
            expect(customer.rentals[0]!.daysRented).toBe(365)
        })

        it('should handle adding many rentals', () => {
            for (let i = 1; i <= 100; i++) {
                customer.addRental(regularMovie, i)
            }
            expect(customer.rentals).toHaveLength(100)
        })
    })
    
    describe('getTotalCharge', () => {
        it('should return 0 for customer with no rentals', () => {
            expect(customer.getTotalCharge()).toBe(0)
        })
        
        it('should calculate total charge for single rental', () => {
            customer.addRental(regularMovie, 5)
            expect(customer.getTotalCharge()).toBe(6.5)
        })
        
        it('should calculate total charge for multiple rentals', () => {
            customer.addRental(regularMovie, 5)
            customer.addRental(newReleaseMovie, 5)
            customer.addRental(childrensMovie, 5)
            expect(customer.getTotalCharge()).toBe(26)
        })

        
        it('should handle single day rentals accurately', () => {
            customer.addRental(regularMovie, 1) 
            customer.addRental(newReleaseMovie, 1) 
            customer.addRental(childrensMovie, 1) 
            expect(customer.getTotalCharge()).toBe(6.5)
        })

        it('should handle boundary conditions', () => {
            customer.addRental(regularMovie, 2) 
            customer.addRental(childrensMovie, 3) 
            expect(customer.getTotalCharge()).toBe(3.5)
        })

        it('should handle large numbers of rentals', () => {
            
            for (let i = 0; i < 50; i++) {
                customer.addRental(regularMovie, 1)
            }
            expect(customer.getTotalCharge()).toBe(100) 
        })

        it('should handle decimal precision correctly', () => {
            customer.addRental(regularMovie, 3) 
            customer.addRental(childrensMovie, 4) 
            expect(customer.getTotalCharge()).toBe(6.5)
        })

        it('should verify the Children pricing bug fix', () => {
            customer.addRental(childrensMovie, 5) 
            expect(customer.getTotalCharge()).toBe(4.5)
            expect(customer.getTotalCharge()).not.toBe(3.0) 
        })
    })
    
    describe('getTotalFrequentRenterPoints', () => {
        it('should return 0 for customer with no rentals', () => {
            expect(customer.getTotalFrequentRenterPoints()).toBe(0)
        })
        
        it('should calculate total points for single rental', () => {
            customer.addRental(regularMovie, 5)
            expect(customer.getTotalFrequentRenterPoints()).toBe(1)
        })
        
        it('should calculate total points for multiple rentals', () => {
            customer.addRental(regularMovie, 5)
            customer.addRental(newReleaseMovie, 5)
            customer.addRental(childrensMovie, 5)
            expect(customer.getTotalFrequentRenterPoints()).toBe(4)
        })

        
        it('should handle new release bonus points correctly', () => {
            customer.addRental(newReleaseMovie, 1) 
            customer.addRental(newReleaseMovie, 2) 
            expect(customer.getTotalFrequentRenterPoints()).toBe(3)
        })

        it('should handle boundary conditions for new release bonus', () => {
            customer.addRental(newReleaseMovie, 1) 
            customer.addRental(newReleaseMovie, 2) 
            expect(customer.getTotalFrequentRenterPoints()).toBe(3)
        })

        it('should accumulate points correctly for many rentals', () => {
            
            for (let i = 0; i < 10; i++) {
                customer.addRental(regularMovie, 1)
            }
            
            for (let i = 0; i < 5; i++) {
                customer.addRental(newReleaseMovie, 2)
            }
            expect(customer.getTotalFrequentRenterPoints()).toBe(20)
        })

        it('should verify point calculations match pricing strategies', () => {
            customer.addRental(regularMovie, 10) 
            customer.addRental(childrensMovie, 10) 
            customer.addRental(newReleaseMovie, 10) 
            expect(customer.getTotalFrequentRenterPoints()).toBe(4)
        })
    })

    
    describe('Complex Scenarios', () => {
        it('should handle customer with mixed rental patterns', () => {
            
            customer.addRental(regularMovie, 1)   
            customer.addRental(regularMovie, 10)  
            customer.addRental(newReleaseMovie, 1) 
            customer.addRental(newReleaseMovie, 10) 
            customer.addRental(childrensMovie, 1)  
            customer.addRental(childrensMovie, 10) 
            
            expect(customer.getTotalCharge()).toBe(62.5)
            expect(customer.getTotalFrequentRenterPoints()).toBe(7)
        })

        it('should handle customer renting same movie multiple times', () => {
            customer.addRental(regularMovie, 2) 
            customer.addRental(regularMovie, 5) 
            customer.addRental(regularMovie, 1) 
            
            expect(customer.getTotalCharge()).toBe(10.5)
            expect(customer.getTotalFrequentRenterPoints()).toBe(3)
        })

        it('should handle extreme rental durations', () => {
            customer.addRental(regularMovie, 365)    
            customer.addRental(newReleaseMovie, 365) 
            customer.addRental(childrensMovie, 365)  
            
            const totalCharge = customer.getTotalCharge()
            const totalPoints = customer.getTotalFrequentRenterPoints()
            
            expect(totalCharge).toBeGreaterThan(1000) 
            expect(totalPoints).toBe(4) 
        })
    })
})