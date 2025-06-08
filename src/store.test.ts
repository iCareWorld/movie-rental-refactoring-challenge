import { Store } from './store';

const store = new Store();

const cinderella = store.addMovie('Cinderella', Store.PRICE_CODE_CHILDREN);
const star_wars  = store.addMovie('Star Wars', Store.PRICE_CODE_REGULAR);
const gladiator  = store.addMovie('Gladiator', Store.PRICE_CODE_NEW_RELEASE);

const john_smith = store.addCustomer('John Smith');

john_smith.addRental(cinderella, 5);
john_smith.addRental(star_wars, 5);
john_smith.addRental(gladiator, 5);

describe("store", () => {

    describe("movies", () => {

        it("should be 3", () => {
            expect(store.movies.length).toBe(3);
        });
        it("should have the correct titles", () => {
            expect(store.movies[0].title).toBe('Cinderella');
            expect(store.movies[1].title).toBe('Star Wars');
            expect(store.movies[2].title).toBe('Gladiator');
        });
        it("should have the correct price codes", () => {
            expect(store.movies[0].priceCode.name).toBe('CHILDREN');
            expect(store.movies[1].priceCode.name).toBe('REGULAR');
            expect(store.movies[2].priceCode.name).toBe('NEW RELEASE');
        });

    })

    describe("customers", () => {

        it("should be 1", () => {
            expect(store.customers.length).toBe(1);
        });
        it("should have the correct name", () => {
            expect(store.customers[0].name).toBe('John Smith');
        });

    })

    let customer = store.customers[0];

    describe("rentals", () => {

        it("should be 3", () => {
            expect(customer.rentals.length).toBe(3);
        });
        it("should be for the correct movies", () => {
            expect(customer.rentals[0].movie.title).toBe('Cinderella');
            expect(customer.rentals[1].movie.title).toBe('Star Wars');
            expect(customer.rentals[2].movie.title).toBe('Gladiator');
        });
        it("should be for the correct number of days rented", () => {
            expect(customer.rentals[0].daysRented).toBe(5);
            expect(customer.rentals[1].daysRented).toBe(5);
            expect(customer.rentals[2].daysRented).toBe(5);
        });

    })

    describe("statement", () => {

        it("should be 3", () => {
            const data = customer.getStatementData();
    
            expect(data.rentalLineItems[0].title).toBe('Cinderella');
            expect(data.rentalLineItems[0].charge.toString()).toBe('3');
            expect(data.rentalLineItems[1].title).toBe('Star Wars');
            expect(data.rentalLineItems[1].charge.toString()).toBe('6.5');
            expect(data.rentalLineItems[2].title).toBe('Gladiator');
            expect(data.rentalLineItems[2].charge.toString()).toBe('15');
        })

        it("should match full statement text",() => {
            const statement = customer.statement();

            expect(statement).toBe(
                "Rental record for John Smith\n"+
                "\tCinderella\t3\n"+
                "\tStar Wars\t6.5\n"+
                "\tGladiator\t15\n"+
                "Amount owed is 24.5\n"+
                "You earned 4 frequent renter points."
            );
        });

    })

})
