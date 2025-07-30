class PriceCode {
    constructor(public readonly name: string) {}
}

class Movie {
    constructor(public readonly title: string, public readonly priceCode: PriceCode) {}
}

class Rental {
    constructor(public readonly movie: Movie, public readonly daysRented: number) {}
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

    private amountFor(rental: Rental): number {
        let result = 0
        if (rental.movie.priceCode.name === 'REGULAR') {
            result += 2
            if (rental.daysRented > 2) {
                result += ((rental.daysRented - 2) * 1.5)
            }
        }
        else if (rental.movie.priceCode.name === 'NEW RELEASE') {
            result += rental.daysRented * 3
        }
        else if (rental.movie.priceCode.name === 'CHILDREN') {
            result += 1.5;
            if (rental.daysRented > 3) {
                result += (rental.daysRented - 3) * 1.5
            }
        }
        return result
    }

    statement() {
        let totalAmount = 0
        let frequentRenterPoints = 0
        let result = "Rental record for " + this.name + "\n"
        // determine amounts for each line

        for (const each of this.rentals) {
            let thisAmount = this.amountFor(each)
            
            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two-day new-release rental
            if ((each.movie.priceCode.name === 'NEW RELEASE') && (each.daysRented > 1)) {
                frequentRenterPoints ++
            }
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