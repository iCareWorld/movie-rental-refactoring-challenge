import { PriceCode } from "./constants/PriceCode";
import { Customer } from "./entities/Customer";
import { Movie } from "./entities/Movie";

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
