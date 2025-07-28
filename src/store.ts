import { Customer } from "./customer"
import { Movie } from "./movie"
import { PriceCode, PriceCodeType } from "./priceCode"

export class Store {
    static readonly PRICE_CODE_REGULAR: PriceCode = new PriceCode(PriceCodeType.Regular)
    static readonly PRICE_CODE_CHILDREN: PriceCode = new PriceCode(PriceCodeType.Children)
    static readonly PRICE_CODE_NEW_RELEASE: PriceCode = new PriceCode(PriceCodeType.NewRelease)

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

    findCustomer(name: string): Customer | null {
        const result = this.customers.filter((customer) => customer.name === name)
        if (result.length > 0) {
            return result[0]
        } else {
            return null
        }
    }

}