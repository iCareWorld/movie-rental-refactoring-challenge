import { Movie } from "./movie";
import { Rental } from "./rental";
import { IStatementData, StatementGenerator } from "../services/statementGenerator";

/**
 * Represents a customer of the video store and manages it`s data
 * The final formatting of that statement is delegated to a generator function.
 * 
 * @property {string} name The customer's full name
 * @property {Rental[]} rentals A list of all rentals associated with this customer.
 */
export class Customer {

    readonly rentals: Rental[] = [];

    constructor(readonly name: string) { }

    /**
     * Adds a new movie rental to the customer's.
     * @param {Movie} movie The movie being rented.
     * @param {number} daysRented The number of days for which the movie is rented.
     * @returns {Rental} The newly created rental, now associated with the customer.
     */
    addRental(movie: Movie, daysRented: number): Rental {
        const rental = new Rental(movie, daysRented);
        this.rentals.push(rental);
        return rental;
    }

    /**
     * Calculates and aggregates all data required for a statement.
     * @returns {IStatementData} A DTO with the required informations
     */
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

    /**
     * Generates a formatted statement string using a provided generator function.
     * @param {function(IStatementData): string} [generatorFn=StatementGenerator.generate] The function used
     * to format the statement data into a string. It defaults to the plain text generator.
     * @returns {string} The final, formatted statement as a string.
     */
    statement(generatorFn: (data: IStatementData) => string = StatementGenerator.generate): string {
        return generatorFn(this.getStatementData());
    }

    /**
     * Calculates the total rental charge for all of the customer's rentals.
     * @returns {number} The total charge.
     */
    private getTotalAmount(): number {
        return this.rentals.reduce((sum, rental) => sum + rental.getAmount(), 0);
    }

    /**
     * Calculates the total frequent renter points earned by the customer.
     * @returns {number} The total frequent renter points.
     */
    private getTotalFrequentRenterPoints(): number {
        return this.rentals.reduce((sum, rental) => sum + rental.getFrequentRenterPoints(), 0);
    }

}