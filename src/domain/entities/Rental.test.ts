import { Rental } from './Rental'
import { Movie } from './Movie'
import { RegularPrice } from '../pricing/Price'

describe('Rental', () => {
    const regularPrice = new RegularPrice()
    const movie = new Movie('Star Wars', regularPrice)
    const rental = new Rental(movie, 5)
    
    it('should delegate charge calculation to movie', () => {
        expect(rental.getCharge()).toBe(6.5)
    })
    
    it('should delegate frequent renter points to movie', () => {
        expect(rental.getFrequentRenterPoints()).toBe(1)
    })
})