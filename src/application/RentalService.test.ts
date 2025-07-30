import { RentalService } from './RentalService'
import { Customer } from '../domain/entities/Customer'
import { Movie } from '../domain/entities/Movie'
import { RegularPrice, NewReleasePrice, ChildrensPrice } from '../domain/pricing/Price'

describe('RentalService', () => {
    let service: RentalService
    let customer: Customer
    
    beforeEach(() => {
        service = new RentalService()
        customer = new Customer('John Smith')
    })
    
    describe('generateStatement', () => {
        it('should generate statement for customer with no rentals', () => {
            const statement = service.generateStatement(customer)
            expect(statement).toContain('John Smith')
            expect(statement).toContain('Amount owed is 0')
            expect(statement).toContain('You earned 0 frequent renter points')
        })
        
        it('should generate statement for customer with single rental', () => {
            const movie = new Movie('Star Wars', new RegularPrice())
            customer.addRental(movie, 5)
            
            const statement = service.generateStatement(customer)
            expect(statement).toContain('John Smith')
            expect(statement).toContain('Star Wars')
            expect(statement).toContain('Amount owed is 6.5')
            expect(statement).toContain('You earned 1 frequent renter points')
        })
        
        it('should generate statement for customer with multiple rentals', () => {
            customer.addRental(new Movie('Cinderella', new ChildrensPrice()), 5)
            customer.addRental(new Movie('Star Wars', new RegularPrice()), 5)
            customer.addRental(new Movie('Gladiator', new NewReleasePrice()), 5)
            
            const statement = service.generateStatement(customer)
            expect(statement).toContain('John Smith')
            expect(statement).toContain('Cinderella')
            expect(statement).toContain('Star Wars')
            expect(statement).toContain('Gladiator')
            expect(statement).toContain('Amount owed is 26')
            expect(statement).toContain('You earned 4 frequent renter points')
        })
    })
})