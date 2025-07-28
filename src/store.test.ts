import { Store } from './store'


let store = new Store()

describe("store", () => {

    beforeEach(() => {
        store = new Store()
        const john_smith = store.addCustomer('John Smith')
        const cinderella = store.addMovie('Cinderella', Store.PRICE_CODE_CHILDREN)
        const star_wars  = store.addMovie('Star Wars', Store.PRICE_CODE_REGULAR)
        const gladiator  = store.addMovie('Gladiator', Store.PRICE_CODE_NEW_RELEASE)
        john_smith.addRental(cinderella, 5)
        john_smith.addRental(star_wars, 5)
        john_smith.addRental(gladiator, 5)
    })

    describe("movies", () => {
        it("should be 3", () => {
            expect(store.movies.length).toBe(3)
        })
        it("should have the correct titles", () => {
            expect(store.movies[0].title).toBe('Cinderella')
            expect(store.movies[1].title).toBe('Star Wars')
            expect(store.movies[2].title).toBe('Gladiator')
        })
        it("should have the correct price codes", () => {
            expect(store.movies[0].priceCode.name).toBe('CHILDREN')
            expect(store.movies[1].priceCode.name).toBe('REGULAR')
            expect(store.movies[2].priceCode.name).toBe('NEW RELEASE')
        })

    })

    describe("customers", () => {
        store.addCustomer('John Smith')

        it("should be 1", () => {
            expect(store.customers.length).toBe(1)
        })
        it("should have the correct name", () => {
            expect(store.customers[0].name).toBe('John Smith')
        })

        it("should find customer by name", () => {
            let result = store.findCustomer('John Smith')
            expect(result).toBeTruthy()
            expect(result?.name).toBe('John Smith')
        })

        it("should return null if customer doesn't exist", () => {
            let result = store.findCustomer('Paul Smith')
            expect(result).toBeNull()

        })
    })


    describe("rentals", () => {
        const john_smith = store.addCustomer('John Smith')
        const cinderella = store.addMovie('Cinderella', Store.PRICE_CODE_CHILDREN)
        const star_wars  = store.addMovie('Star Wars', Store.PRICE_CODE_REGULAR)
        const gladiator  = store.addMovie('Gladiator', Store.PRICE_CODE_NEW_RELEASE)

        john_smith.addRental(cinderella, 5)
        john_smith.addRental(star_wars, 5)
        john_smith.addRental(gladiator, 5)

        it("should be 3", () => {
            expect(john_smith.rentals.length).toBe(3)
        })
        it("should be for the correct movies", () => {
            expect(john_smith.rentals[0].movie.title).toBe('Cinderella')
            expect(john_smith.rentals[1].movie.title).toBe('Star Wars')
            expect(john_smith.rentals[2].movie.title).toBe('Gladiator')
        })
        it("should be for the correct number of days rented", () => {
            expect(john_smith.rentals[0].daysRented).toBe(5)
            expect(john_smith.rentals[1].daysRented).toBe(5)
            expect(john_smith.rentals[2].daysRented).toBe(5)
        })

    })

    describe("statement", () => {
        const customer = store.addCustomer('John Smith')
        const cinderella = store.addMovie('Cinderella', Store.PRICE_CODE_CHILDREN)
        const star_wars  = store.addMovie('Star Wars', Store.PRICE_CODE_REGULAR)
        const gladiator  = store.addMovie('Gladiator', Store.PRICE_CODE_NEW_RELEASE)

        customer.addRental(cinderella, 5)
        customer.addRental(star_wars, 5)
        customer.addRental(gladiator, 5)

        console.log(customer.statement())


        /**
         * 
         *  Rental record for John Smith
        Cinderella      3
        Star Wars       6.5
        Gladiator       15
    Amount owed is 24.5
    You earned 4 frequent renter points.
         * 
         */
        it("should be 3", () => {
            // At this point, the structure of the program begins getting in the
            // way of testing. Rentals are imbedded in the Customer object, but
            // there is no property to access them. They can only be accessed
            // internally, by the Statement() method, which imbeds them in the
            // text string passed as it's return value. So, to get these amounts,
            // we will have to parse that value
            const statementTokens = []
            const lines = customer.statement().split("\n")
            for (let i=0; i<lines.length; i++) {
                let lineTokens = lines[i].split("\t")
                for (let j=0; j<lineTokens.length; j++) {
                    statementTokens.push(lineTokens[j])
                }
            }
            // The statementTokens[] array will have the following elements:
            //    [0] = junk
            //    [1] = junk
            //    [2] = title #1
            //    [3] = price #1
            //    [4] = junk
            //    [5] = title #2
            //    [6] = price #2
            //    [7] = junk
            //    [8] = title #3
            //    [9] = price #3
            //    [10] = "Amount owed is x"
            //    [11] = "You earned x frequent renter points."
            // We will test the title and price elements, and the total
            // and frequent renter points items. If these tests pass, then
            // we know that AddRentals() is adding rentals to a Customer
            // object properly, and that the Statement() method is
            // generating a statement in the expected format.
            expect(statementTokens[2]).toBe('Cinderella')
            expect(statementTokens[3]).toBe('3')
            expect(statementTokens[5]).toBe('Star Wars')
            expect(statementTokens[6]).toBe('6.5')
            expect(statementTokens[8]).toBe('Gladiator')
            expect(statementTokens[9]).toBe('15')
        })

    })

})
