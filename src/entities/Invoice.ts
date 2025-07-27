import { calculatePrice } from "../utils/rentalUtils";
import { Movie } from "./Movie";
import { Rental } from "./Rental";

export class Invoice {
  private rentals: Rental[];
  private totalPrice: number;
  private totalPointsEarned: number;

  constructor(public readonly customerName: string) {
    this.rentals = [];
    this.totalPrice = 0;
    this.totalPointsEarned = 0;
  }

  addRental(movie: Movie, daysRented: number) {
    let rental = new Rental(movie, daysRented);
    this.rentals.push(rental);

    this.totalPrice = this.totalPrice + rental.price;
    this.totalPointsEarned = this.totalPointsEarned + rental.pointsEarned;

    return rental;
  }

  printInvoice() {
    console.log("Rental record for " + this.customerName + "\n");

    let lineItems = "";

    for (const each of this.rentals) {
      lineItems += "\t" + each.movie.title + "\t" + each.price + "\n";
    }

    console.log(lineItems);
    console.log("Amount owed is " + this.totalPrice + "\n");
    console.log(
      "You earned " + this.totalPointsEarned + " frequent renter points.",
    );
  }
}
