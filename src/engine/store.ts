import { Customer } from "./customer"
import { Movie } from "./movie"
import { PriceCode } from "./price-code"

export class Store {
    static readonly PRICE_CODE_REGULAR: PriceCode = new PriceCode('REGULAR')
    static readonly PRICE_CODE_CHILDREN: PriceCode = new PriceCode('CHILDREN')
    static readonly PRICE_CODE_NEW_RELEASE: PriceCode = new PriceCode('NEW RELEASE')

    movies: Movie[]
    customers: Customer[]

    constructor() {
        this.movies = []
        this.customers = []
    }

    addMovie(name: string, priceCode: PriceCode) {
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