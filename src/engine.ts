import { PriceCode } from "./constants/PriceCode";
import { Movie } from "./entities/Movie";
import { calculatePrice, calculatePointsEarned } from "./utils/rentalUtils";

class Rental {
  public readonly price: number;
  public readonly pointsEarned: number;

  constructor(
    public readonly movie: Movie,
    public readonly daysRented: number,
  ) {
    this.price = calculatePrice(movie.priceCode, daysRented);
    this.pointsEarned = calculatePointsEarned(movie.priceCode, daysRented);
  }
}

class Customer {
  name: string;
  rentals: Rental[];

  constructor(name: string) {
    this.name = name;
    this.rentals = [];
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

export class Store {
  movies: Movie[];
  customers: Customer[];

  constructor() {
    this.movies = [];
    this.customers = [];
  }

  addMovie(name: string, priceCode: PriceCode) {
    let movie = new Movie(name, priceCode);
    this.movies.push(movie);
    return movie;
  }

  addCustomer(name: string) {
    let customer = new Customer(name);
    this.customers.push(customer);
    return customer;
  }
}
