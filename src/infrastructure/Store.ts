import { Movie } from '../domain/entities/Movie'
import { Customer } from '../domain/entities/Customer'
import { Price, RegularPrice, ChildrensPrice, NewReleasePrice } from '../domain/pricing/Price'
import { RentalService } from '../application/RentalService'

export class Store {
    static readonly PRICE_CODE_REGULAR: Price = new RegularPrice()
    static readonly PRICE_CODE_CHILDREN: Price = new ChildrensPrice()
    static readonly PRICE_CODE_NEW_RELEASE: Price = new NewReleasePrice()

    movies: Movie[]
    customers: CustomerWithStatement[]
    private rentalService: RentalService

    constructor() {
        this.movies = []
        this.customers = []
        this.rentalService = new RentalService()
    }

    addMovie(name: string, price: Price) {
        const movie = new Movie(name, price)
        this.movies.push(movie)
        return movie
    }

    addCustomer(name: string) {
        const customer = new CustomerWithStatement(name, this.rentalService)
        this.customers.push(customer)
        return customer
    }
}

class CustomerWithStatement extends Customer {
    constructor(name: string, private rentalService: RentalService) {
        super(name)
    }

    statement(): string {
        return this.rentalService.generateStatement(this)
    }
}