import { Movie } from './Movie'
import { Rental } from './Rental'

export class Customer {
    name: string
    rentals: Rental[]

    constructor(name: string) {
        this.name = name
        this.rentals = []
    }

    addRental(movie: Movie, daysRented: number) {
        const rental = new Rental(movie, daysRented)
        this.rentals.push(rental)
        return rental
    }

    getTotalCharge(): number {
        return this.rentals.reduce((total, rental) => total + rental.getCharge(), 0)
    }

    getTotalFrequentRenterPoints(): number {
        return this.rentals.reduce((total, rental) => total + rental.getFrequentRenterPoints(), 0)
    }
}