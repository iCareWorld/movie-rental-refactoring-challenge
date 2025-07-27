import { Store } from "./engine";
import { PriceCode } from "./constants/PriceCode";

const store = new Store();

const cinderella = store.addMovie("Cinderella", PriceCode.CHILDREN);
const star_wars = store.addMovie("Star Wars", PriceCode.REGULAR);
const gladiator = store.addMovie("Gladiator", PriceCode.NEW_RELEASE);

const john_smith = store.addCustomer("John Smith");

john_smith.addRental(cinderella, 5);
john_smith.addRental(star_wars, 5);
john_smith.addRental(gladiator, 5);

console.log(john_smith.statement());
