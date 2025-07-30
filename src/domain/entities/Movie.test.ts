import { Movie } from './Movie'
import { RegularPrice, NewReleasePrice } from '../pricing/Price'

describe('Movie', () => {
    describe('with RegularPrice', () => {
        const regularPrice = new RegularPrice()
        const movie = new Movie('Star Wars', regularPrice)
        
        it('should delegate charge calculation to pricing strategy', () => {
            expect(movie.getCharge(5)).toBe(6.5)
        })
        
        it('should delegate frequent renter points to pricing strategy', () => {
            expect(movie.getFrequentRenterPoints(5)).toBe(1)
        })
    })
    
    describe('with NewReleasePrice', () => {
        const newReleasePrice = new NewReleasePrice()
        const movie = new Movie('Gladiator', newReleasePrice)
        
        it('should delegate charge calculation to pricing strategy', () => {
            expect(movie.getCharge(5)).toBe(15)
        })
        
        it('should delegate frequent renter points to pricing strategy', () => {
            expect(movie.getFrequentRenterPoints(5)).toBe(2)
        })
    })
})