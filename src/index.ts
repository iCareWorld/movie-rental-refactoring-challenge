import { Customer } from "./domain/Customer/Customer";
import { Movie } from "./domain/Movie/Movie";
import { MovieRental } from "./domain/MovieRental/MovieRental";
import { ChildrenRentalPolicy } from "./rentalPolicy/ChildrenRentalPolicy/ChildrenRentalPolicy";
import { NewReleaseRentalPolicy } from "./rentalPolicy/NewReleaseRentalPolicy/NewReleaseRentalPolicy";
import { RegularRentalPolicy } from "./rentalPolicy/RegularRentalPolicy/RegularRentalPolicy";
import { StatementFormatter } from "./services/StatementFormatter";

// Setup
const cinderella = new Movie("Cinderella", new ChildrenRentalPolicy());
const starWars = new Movie("Star Wars", new RegularRentalPolicy());
const gladiator = new Movie("Gladiator", new NewReleaseRentalPolicy());

const johnSmith = new Customer("John Smith");

johnSmith.addRental(new MovieRental(cinderella, 5));
johnSmith.addRental(new MovieRental(starWars, 5));
johnSmith.addRental(new MovieRental(gladiator, 5));

const formatter = new StatementFormatter();
console.log(formatter.format(johnSmith));

// import { Store } from "./engine";

// const store = new Store();

// const cinderella = store.addMovie("Cinderella", Store.PRICE_CODE_CHILDREN);
// const star_wars = store.addMovie("Star Wars", Store.PRICE_CODE_REGULAR);
// const gladiator = store.addMovie("Gladiator", Store.PRICE_CODE_NEW_RELEASE);

// const john_smith = store.addCustomer("John Smith");

// john_smith.addRental(cinderella, 5);
// john_smith.addRental(star_wars, 5);
// john_smith.addRental(gladiator, 5);

// console.log(john_smith.statement());
