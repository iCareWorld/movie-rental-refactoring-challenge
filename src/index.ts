import { Store } from "./engine";
import { PriceCode } from "./constants/PriceCode";

const store = new Store();

const cinderella = store.addMovie("Cinderella", PriceCode.CHILDREN);
const star_wars = store.addMovie("Star Wars", PriceCode.REGULAR);
const gladiator = store.addMovie("Gladiator", PriceCode.NEW_RELEASE);

const john_smith = store.addCustomer("John Smith");

const invoice = john_smith.addInvoice();

invoice.addRental(cinderella, 5);
invoice.addRental(star_wars, 5);
invoice.addRental(gladiator, 5);

invoice.printInvoice();
