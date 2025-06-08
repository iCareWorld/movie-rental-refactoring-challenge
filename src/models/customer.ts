import { Movie } from "./movie";
import { Rental } from "./rental";
import { IStatementData, StatementGenerator } from "../services/statementGenerator";

export class Customer {

    readonly rentals: Rental[] = [];

    constructor(readonly name: string) { }

    addRental(movie: Movie, daysRented: number): Rental {
        const rental = new Rental(movie, daysRented);
        this.rentals.push(rental);
        return rental;
    }

    getStatementData(): IStatementData {
        return {
            customerName: this.name,
            rentalLineItems: this.rentals.map(rental => ({
                title: rental.movieTitle,
                charge: rental.getAmount()
            })),
            totalAmount: this.getTotalAmount(),
            totalFrequentRenterPoints: this.getTotalFrequentRenterPoints(),
        };
    }

    statement(generatorFn : (data: IStatementData) => string = StatementGenerator.generate){
        return generatorFn(this.getStatementData());
    }

    private getTotalAmount(): number {
        return this.rentals.reduce((sum, rental) => sum + rental.getAmount(), 0);
    }

    private getTotalFrequentRenterPoints(): number {
        return this.rentals.reduce((sum, rental) => sum + rental.getFrequentRenterPoints(), 0);
    }

}