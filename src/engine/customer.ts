import { Movie } from "./movie";
import { Rental } from "./rental";

export class Customer {
    name: string;
    rentals: Rental[];

    constructor(name: string) {
        this.name = name
        this.rentals = []
    }

    addRental(movie: Movie, daysRented: number) {
        let rental = new Rental(movie, daysRented)
        this.rentals.push(rental)
        return rental
    }

    statement() {
        let totalAmount = 0
        let frequentRenterPoints = 0
        let result = "Rental record for " + this.name + "\n"
        // determine amounts for each line

        for (const rental of this.rentals) {
            let thisAmount = rental.movie.pricingStrategy.calculatePrice(rental.daysRented)
            frequentRenterPoints += rental.movie.pricingStrategy.calculateFrequentRenterPoints(rental.daysRented)

            result += "\t" + rental.movie.title + "\t" + thisAmount + "\n"
            totalAmount += thisAmount
        }

        // add footer lines
        result += "Amount owed is " + totalAmount + "\n"
        result += "You earned " + frequentRenterPoints + " frequent renter points."
        return result
    }
}