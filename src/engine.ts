import { Customer } from "./customer";
import { Movie } from "./movie";
import { ChildrenPriceCode, IPriceCode, NewReleasePriceCode, RegularPriceCode } from "./priceCodes";

export class Store {
    static readonly PRICE_CODE_REGULAR: IPriceCode = new RegularPriceCode();
    static readonly PRICE_CODE_CHILDREN: IPriceCode = new ChildrenPriceCode();
    static readonly PRICE_CODE_NEW_RELEASE: IPriceCode = new NewReleasePriceCode();

    movies: Movie[]
    customers: Customer[]

    constructor() {
        this.movies = []
        this.customers = []
    }

    addMovie(name: string, priceCode: IPriceCode) {
        let movie = new Movie(name, priceCode)
        this.movies.push(movie)
        return movie
    }

    addCustomer(name: string) {
        let customer = new Customer(name)
        this.customers.push(customer)
        return customer
    }
}