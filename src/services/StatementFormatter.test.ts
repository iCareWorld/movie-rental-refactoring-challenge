import { StatementFormatter } from "../services/StatementFormatter";
import { ChildrenRentalPolicy } from "../rentalPolicy/ChildrenRentalPolicy/ChildrenRentalPolicy";
import { RegularRentalPolicy } from "../rentalPolicy/RegularRentalPolicy/RegularRentalPolicy";
import { NewReleaseRentalPolicy } from "../rentalPolicy/NewReleaseRentalPolicy/NewReleaseRentalPolicy";
import { Movie } from "../domain/Movie/Movie";
import { Customer } from "../domain/Customer/Customer";
import { MovieRental } from "../domain/MovieRental/MovieRental";

describe("StatementFormatter", () => {
  it("prints the full rental statement correctly", () => {
    const cinderella = new Movie("Cinderella", new ChildrenRentalPolicy());
    const starWars = new Movie("Star Wars", new RegularRentalPolicy());
    const gladiator = new Movie("Gladiator", new NewReleaseRentalPolicy());

    const customer = new Customer("John Smith");
    customer.addRental(new MovieRental(cinderella, 5));
    customer.addRental(new MovieRental(starWars, 5));
    customer.addRental(new MovieRental(gladiator, 5));

    const formatter = new StatementFormatter();
    const statement = formatter.format(customer);

    expect(statement).toContain("Rental record for John Smith");
    expect(statement).toContain("\tCinderella\t3");
    expect(statement).toContain("\tStar Wars\t6.5");
    expect(statement).toContain("\tGladiator\t15");
    expect(statement).toContain("Amount owed is 24.5");
    expect(statement).toContain("You earned 4 frequent renter points.");
  });
});
