import { Customer } from '../domain/entities/Customer'

export class StatementFormatter {
    format(customer: Customer): string {
        let result = 'Rental record for ' + customer.name + '\n'
        
        for (const rental of customer.rentals) {
            result += '\t' + rental.movie.title + '\t' + rental.getCharge() + '\n'
        }
        
        result += 'Amount owed is ' + customer.getTotalCharge() + '\n'
        result += 'You earned ' + customer.getTotalFrequentRenterPoints() + ' frequent renter points.'
        return result
    }
}