import { Store } from './Store'

describe('Store', () => {
    let store: Store
    
    beforeEach(() => {
        store = new Store()
    })
    
    describe('addMovie', () => {
        it('should add movie to store', () => {
            const movie = store.addMovie('Star Wars', Store.PRICE_CODE_REGULAR)
            expect(store.movies).toHaveLength(1)
            expect(store.movies[0]).toBe(movie)
            expect(movie.title).toBe('Star Wars')
        })
    })
    
    describe('addCustomer', () => {
        it('should add customer to store', () => {
            const customer = store.addCustomer('John Smith')
            expect(store.customers).toHaveLength(1)
            expect(store.customers[0]).toBe(customer)
            expect(customer.name).toBe('John Smith')
        })
    })
    
    describe('price codes', () => {
        it('should provide consistent pricing strategies', () => {
            expect(Store.PRICE_CODE_REGULAR.getCharge(5)).toBe(6.5)
            expect(Store.PRICE_CODE_CHILDREN.getCharge(5)).toBe(4.5)
            expect(Store.PRICE_CODE_NEW_RELEASE.getCharge(5)).toBe(15)
        })
    })
})