import { Customer } from "./customer"
import { Movie } from "./movie"
import {
    ChildrensPricingStrategy,
    RegularPricingStrategy,
    NewReleasePricingStrategy,
    PricingStrategy
} from "./pricing"

export class Store {
    /** @deprecated Use `new RegularPricingStrategy()` instead */
    static readonly PRICE_CODE_REGULAR = new RegularPricingStrategy()
    
    /** @deprecated Use `new ChildrensPricingStrategy()` instead */
    static readonly PRICE_CODE_CHILDREN = new ChildrensPricingStrategy()
    
    /** @deprecated Use `new NewReleasePricingStrategy()` instead */
    static readonly PRICE_CODE_NEW_RELEASE = new NewReleasePricingStrategy()

    movies: Movie[]
    customers: Customer[]

    constructor() {
        this.movies = []
        this.customers = []
    }

    addMovie(name: string, priceCode: PricingStrategy) {
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