import { Customer } from '../domain/entities/Customer'
import { StatementFormatter } from '../presentation/StatementFormatter'

export class RentalService {
    private formatter = new StatementFormatter()

    generateStatement(customer: Customer): string {
        return this.formatter.format(customer)
    }
}