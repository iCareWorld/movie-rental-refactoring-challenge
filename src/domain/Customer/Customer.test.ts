import { Customer } from "./Customer";
import { Movie } from "../Movie/Movie";
import { MovieRental } from "../MovieRental/MovieRental";
import { ChildrenRentalPolicy } from "../../rentalPolicy/ChildrenRentalPolicy/ChildrenRentalPolicy";
import { RegularRentalPolicy } from "../../rentalPolicy/RegularRentalPolicy/RegularRentalPolicy";
import { NewReleaseRentalPolicy } from "../../rentalPolicy/NewReleaseRentalPolicy/NewReleaseRentalPolicy";

describe("Customer", () => {
  const cinderella = new Movie("Cinderella", new ChildrenRentalPolicy());
  const starWars = new Movie("Star Wars", new RegularRentalPolicy());
  const gladiator = new Movie("Gladiator", new NewReleaseRentalPolicy());

  const customer = new Customer("John Smith");
  customer.addRental(new MovieRental(cinderella, 5));
  customer.addRental(new MovieRental(starWars, 5));
  customer.addRental(new MovieRental(gladiator, 5));

  it("returns correct name", () => {
    expect(customer.getName()).toBe("John Smith");
  });

  it("returns 3 movie rentals", () => {
    expect(customer.getMovieRentalHistory().length).toBe(3);
  });

  it("returns correct frequent renter points", () => {
    expect(customer.getFrequentRenterPoints()).toBe(4);
  });
});
