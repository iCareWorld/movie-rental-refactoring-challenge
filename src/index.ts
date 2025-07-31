import {Store} from './engine'
import {PriceCode} from "./models/price_code";

const store = new Store()

const cinderella = store.addMovie('Cinderella', PriceCode.CHILDREN)
const star_wars  = store.addMovie('Star Wars', PriceCode.REGULAR)
const gladiator  = store.addMovie('Gladiator', PriceCode.NEW_RELEASE)

const john_smith = store.addCustomer('John Smith')

// Add rentals for John Smith
store.addRental(john_smith, cinderella, 5)
store.addRental(john_smith, star_wars, 5)
store.addRental(john_smith, gladiator, 5)

// Generate and print the statement for John Smith
console.log(store.getStatementForCustomer(john_smith))
