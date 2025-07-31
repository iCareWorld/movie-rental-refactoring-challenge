import {Customer} from "./models/customer";
import {Movie} from './models/movie'
import {PriceCode} from './models/price_code'
import {Rental} from "./models/rental";
import {generateStatement} from "./services/statement_generator";

export class Store {
    private movies: Movie[]
    private customers: Customer[]
    private rentals: Rental[]

    constructor() {
        this.movies = []
        this.customers = []
        this.rentals = []
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

    addRental(customer: Customer, movie: Movie, daysRented: number) {
        let rental = new Rental(customer, movie, daysRented)
        this.rentals.push(rental)
        return rental
    }

    getMovies(): Movie[] {
        return this.movies.slice()
    }

    getCustomers(): Customer[] {
        return this.customers.slice()
    }

    getRentals(): Rental[] {
        return this.rentals.slice()
    }

    findRentalsForCustomer(customer: Customer): Rental[] {
        return this.rentals.filter(rental => rental.customer === customer)
    }

    getStatementForCustomer(customer: Customer): string {
        const rentals = this.findRentalsForCustomer(customer)
        if (rentals.length === 0) {
            return `No rentals found for customer: ${customer.name}`
        }
        return generateStatement(rentals, customer)
    }
}
