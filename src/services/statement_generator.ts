import {Rental} from "../models/rental";
import {Customer} from "../models/customer";
import {calculateCostPerRental, calculateTotalBonusPoints, calculateTotalRentalAmount} from "./rental_cost_calculator";

export function generateStatement(rentals: Rental[], customer: Customer): string {
    let totalAmount = calculateTotalRentalAmount(rentals)
    let frequentRenterPoints = calculateTotalBonusPoints(rentals)
    let statement = "Rental record for " + customer.name + "\n"

    // show figures for each rental
    for (const [rental, amount] of calculateCostPerRental(rentals)) {
        statement += "\t" + rental.movie.title + "\t" + amount + "\n"
    }
    // add footer lines
    statement += "Amount owed is " + totalAmount + "\n"
    statement += "You earned " + frequentRenterPoints + " frequent renter points."
    return statement
}
