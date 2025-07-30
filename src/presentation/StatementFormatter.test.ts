import { StatementFormatter } from './StatementFormatter'
import { Customer } from '../domain/entities/Customer'
import { Movie } from '../domain/entities/Movie'
import { RegularPrice, NewReleasePrice, ChildrensPrice } from '../domain/pricing/Price'

describe('StatementFormatter', () => {
    let formatter: StatementFormatter
    let customer: Customer
    
    beforeEach(() => {
        formatter = new StatementFormatter()
        customer = new Customer('John Smith')
    })
    
    describe('format', () => {
        it('should format statement for customer with no rentals', () => {
            const statement = formatter.format(customer)
            
            expect(statement).toBe(
                'Rental record for John Smith\n' +
                'Amount owed is 0\n' +
                'You earned 0 frequent renter points.'
            )
        })
        
        it('should format statement for customer with single rental', () => {
            const movie = new Movie('Star Wars', new RegularPrice())
            customer.addRental(movie, 5)
            
            const statement = formatter.format(customer)
            
            expect(statement).toBe(
                'Rental record for John Smith\n' +
                '\tStar Wars\t6.5\n' +
                'Amount owed is 6.5\n' +
                'You earned 1 frequent renter points.'
            )
        })
        
        it('should format statement for customer with multiple rentals', () => {
            customer.addRental(new Movie('Cinderella', new ChildrensPrice()), 5)
            customer.addRental(new Movie('Star Wars', new RegularPrice()), 5)
            customer.addRental(new Movie('Gladiator', new NewReleasePrice()), 5)
            
            const statement = formatter.format(customer)
            
            expect(statement).toBe(
                'Rental record for John Smith\n' +
                '\tCinderella\t4.5\n' +
                '\tStar Wars\t6.5\n' +
                '\tGladiator\t15\n' +
                'Amount owed is 26\n' +
                'You earned 4 frequent renter points.'
            )
        })
    })
})