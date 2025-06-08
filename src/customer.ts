import { Movie } from "./movie";
import { Rental } from "./rental";

export class Customer {
   
    readonly rentals: Rental[] = [];

    constructor(readonly name: string) { }

    addRental(movie: Movie, daysRented: number): Rental {
        const rental = new Rental(movie, daysRented);
        this.rentals.push(rental);
        return rental;
    }

    getTotalAmount(): number {
        return this.rentals.reduce((sum, rental) => sum + rental.getAmount(), 0);
    }

    getTotalFrequentRenterPoints(): number {
        return this.rentals.reduce((sum, rental) => sum + rental.getFrequentRenterPoints(), 0);
    }

    statement() {
        const totalAmount = this.getTotalAmount();
        const frequentRenterPoints = this.getTotalFrequentRenterPoints();

        let result = `Rental record for ${this.name}\n`;

        // determine amounts for each line
        for (const rental of this.rentals) {
            result += `\t${rental.movieTitle}\t${rental.getAmount()}\n`;
        }
        // add footer lines
        result += `Amount owed is ${totalAmount}\n`;
        result += `You earned ${frequentRenterPoints} frequent renter points.`;
        return result
    }
}