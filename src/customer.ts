import { Movie } from "./movie";
import { Rental } from "./rental";

export class Customer {
    name: string;
    rentals: Rental[];
    currentFrequentRenterPoints: number = 0;
    currentAmountOwed: number = 0;

    constructor(name: string) {
        this.name = name
        this.rentals = []
    }

    addRental(movie: Movie, daysRented: number) {
        let rental = new Rental(movie, daysRented)
        this.rentals.push(rental)
        this.addFrequentRentalPoints(rental)
        this.addAmountOwed(rental)
        return rental
    }

    addAmountOwed(rental: Rental) {
        this.currentAmountOwed += rental.amountOwed;
    }

    addFrequentRentalPoints(rental: Rental) {
        // add frequent renter points
        this.currentFrequentRenterPoints++
        // add bonus for a two-day new-release rental
        if ((rental.movie.priceCode.name === 'NEW RELEASE') && (rental.daysRented > 1)) {
            this.currentFrequentRenterPoints++
        }
    }

    statement() {
        let frequentRenterPoints = this.currentFrequentRenterPoints
        let result = "Rental record for " + this.name + "\n"
        // determine amounts for each line

        for (const each of this.rentals) {
            // show figures for this rental
            result += "\t" + each.movie.title + "\t" + each.amountOwed + "\n"
        }
        // add footer lines
        result += "Amount owed is " + this.currentAmountOwed + "\n"
        result += "You earned " + frequentRenterPoints + " frequent renter points."
        return result
    }
}