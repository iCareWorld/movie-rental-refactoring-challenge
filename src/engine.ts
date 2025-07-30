abstract class Price {
    abstract getCharge(daysRented: number): number
    abstract getFrequentRenterPoints(daysRented: number): number
}

class RegularPrice extends Price {
    getCharge(daysRented: number): number {
        let result = 2
        if (daysRented > 2) {
            result += (daysRented - 2) * 1.5
        }
        return result
    }

    getFrequentRenterPoints(_daysRented: number): number {
        return 1
    }
}

class NewReleasePrice extends Price {
    getCharge(daysRented: number): number {
        return daysRented * 3
    }

    getFrequentRenterPoints(daysRented: number): number {
        return daysRented > 1 ? 2 : 1
    }
}

class ChildrensPrice extends Price {
    getCharge(daysRented: number): number {
        let result = 1.5
        if (daysRented > 3) {
            result += (daysRented - 3) * 1.5
        }
        return result
    }

    getFrequentRenterPoints(_daysRented: number): number {
        return 1
    }
}

class Movie {
    constructor(public readonly title: string, private price: Price) {}

    getCharge(daysRented: number): number {
        return this.price.getCharge(daysRented)
    }

    getFrequentRenterPoints(daysRented: number): number {
        return this.price.getFrequentRenterPoints(daysRented)
    }
}

class Rental {
    constructor(public readonly movie: Movie, public readonly daysRented: number) {}

    getCharge(): number {
        return this.movie.getCharge(this.daysRented)
    }

    getFrequentRenterPoints(): number {
        return this.movie.getFrequentRenterPoints(this.daysRented)
    }
}

class Customer {
    name: string;
    rentals: Rental[];

    constructor(name: string) {
        this.name = name
        this.rentals = []
    }

    addRental(movie: Movie, daysRented: number) {
        let rental = new Rental(movie, daysRented)
        this.rentals.push(rental)
        return rental
    }

    statement() {
        let totalAmount = 0
        let frequentRenterPoints = 0
        let result = "Rental record for " + this.name + "\n"
        // determine amounts for each line

        for (const each of this.rentals) {
            let thisAmount = each.getCharge()
            
            // add frequent renter points
            frequentRenterPoints += each.getFrequentRenterPoints()
            
            // show figures for this rental
            result += "\t" + each.movie.title + "\t" + thisAmount + "\n"
            totalAmount += thisAmount
        }
        // add footer lines
        result += "Amount owed is " + totalAmount + "\n"
        result += "You earned " + frequentRenterPoints + " frequent renter points."
        return result
    }
}

export class Store {
    static readonly PRICE_CODE_REGULAR: Price = new RegularPrice()
    static readonly PRICE_CODE_CHILDREN: Price = new ChildrensPrice()
    static readonly PRICE_CODE_NEW_RELEASE: Price = new NewReleasePrice()

    movies: Movie[]
    customers: Customer[]

    constructor() {
        this.movies = []
        this.customers = []
    }

    addMovie(name: string, price: Price) {
        let movie = new Movie(name, price)
        this.movies.push(movie)
        return movie
    }

    addCustomer(name: string) {
        let customer = new Customer(name)
        this.customers.push(customer)
        return customer
    }
}