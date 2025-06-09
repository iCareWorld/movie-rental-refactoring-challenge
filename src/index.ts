import { ChildrenPriceCode } from './models/priceCodes/childrenPriceCode';
import { NewReleasePriceCode } from './models/priceCodes/newReleasePriceCode';
import { RegularPriceCode } from './models/priceCodes/regularPriceCode';
import { Store } from './models/store';
import { PriceCodeRegistry } from './services/priceCodeRegistry';

const store = new Store();

const priceCoderegistry = PriceCodeRegistry.getInstance();
priceCoderegistry.register(RegularPriceCode);
priceCoderegistry.register(NewReleasePriceCode);
priceCoderegistry.register(ChildrenPriceCode);

const cinderella = store.addMovie('Cinderella', ChildrenPriceCode);
const star_wars = store.addMovie('Star Wars', RegularPriceCode);
const gladiator = store.addMovie('Gladiator', NewReleasePriceCode);

const john_smith = store.addCustomer('John Smith');

john_smith.addRental(cinderella, 5);
john_smith.addRental(star_wars, 5);
john_smith.addRental(gladiator, 5);

console.log(john_smith.statement());