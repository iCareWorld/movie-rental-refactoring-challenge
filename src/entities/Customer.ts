import { Invoice } from "./Invoice";
import { Movie } from "./Movie";
import { Rental } from "./Rental";

export class Customer {
  name: string;
  invoices: Invoice[];
  rentals: Rental[];

  constructor(name: string) {
    this.name = name;
    this.invoices = [];
    this.rentals = [];
  }

  addInvoice() {
    const newInvoice = new Invoice(this.name);
    this.invoices.push(newInvoice);

    return newInvoice;
  }

  addRental(movie: Movie, daysRented: number) {
    let rental = new Rental(movie, daysRented);
    this.rentals.push(rental);
    return rental;
  }

  statement() {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = "Rental record for " + this.name + "\n";
    // determine amounts for each line
    for (const each of this.rentals) {
      // add frequent renter points
      frequentRenterPoints = frequentRenterPoints + each.pointsEarned;
      // show figures for this rental
      result += "\t" + each.movie.title + "\t" + each.price + "\n";

      totalAmount += each.price;
    }
    // add footer lines
    result += "Amount owed is " + totalAmount + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points.";
    return result;
  }
}
