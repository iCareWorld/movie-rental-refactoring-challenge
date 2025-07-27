export const PriceCode = {
  REGULAR: "REGULAR",
  NEW_RELEASE: "NEW_RELEASE",
  CHILDREN: "CHILDREN",
} as const;

type PriceCode = (typeof PriceCode)[keyof typeof PriceCode];

class Movie {
  constructor(
    public readonly title: string,
    public readonly priceCode: keyof typeof PriceCode,
  ) {}
}

class Rental {
  constructor(
    public readonly movie: Movie,
    public readonly daysRented: number,
  ) {}
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
      let thisAmount = 0;
      if (each.movie.priceCode === PriceCode.REGULAR) {
        thisAmount += 2;
        if (each.daysRented > 2) {
          thisAmount += (each.daysRented - 2) * 1.5;
        }
      } else if (each.movie.priceCode === PriceCode.NEW_RELEASE) {
        thisAmount += each.daysRented * 3;
      } else if (each.movie.priceCode === PriceCode.CHILDREN) {
        thisAmount += 1.5;
        if (each.daysRented > 3) {
          thisAmount = (each.daysRented - 3) * 1.5;
        }
      }
      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two-day new-release rental
      if (
        each.movie.priceCode === PriceCode.NEW_RELEASE &&
        each.daysRented > 1
      ) {
        frequentRenterPoints++;
      }
      // show figures for this rental
      result += "\t" + each.movie.title + "\t" + thisAmount + "\n";
      totalAmount += thisAmount;
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
