import { Movie } from "../Movie/Movie";
import { MovieRental } from "./MovieRental";
import { ChildrenRentalPolicy } from "../../rentalPolicy/ChildrenRentalPolicy/ChildrenRentalPolicy";
import { RegularRentalPolicy } from "../../rentalPolicy/RegularRentalPolicy/RegularRentalPolicy";
import { NewReleaseRentalPolicy } from "../../rentalPolicy/NewReleaseRentalPolicy/NewReleaseRentalPolicy";

describe("MovieRental", () => {
  it("calculates correct charge for children movie", () => {
    const rental = new MovieRental(
      new Movie("Cinderella", new ChildrenRentalPolicy()),
      5
    );
    expect(rental.getCharge()).toBe(3);
  });

  it("calculates correct charge for regular movie", () => {
    const rental = new MovieRental(
      new Movie("Star Wars", new RegularRentalPolicy()),
      5
    );
    expect(rental.getCharge()).toBe(6.5);
  });

  it("calculates correct charge for new release movie", () => {
    const rental = new MovieRental(
      new Movie("Gladiator", new NewReleaseRentalPolicy()),
      5
    );
    expect(rental.getCharge()).toBe(15);
  });

  it("calculates correct frequent renter points", () => {
    const rental = new MovieRental(
      new Movie("Gladiator", new NewReleaseRentalPolicy()),
      5
    );
    expect(rental.calculateRentalPoints()).toBe(2);
  });
});
