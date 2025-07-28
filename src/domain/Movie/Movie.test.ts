import { ChildrenRentalPolicy } from "../../rentalPolicy/ChildrenRentalPolicy/ChildrenRentalPolicy";
import { NewReleaseRentalPolicy } from "../../rentalPolicy/NewReleaseRentalPolicy/NewReleaseRentalPolicy";
import { RegularRentalPolicy } from "../../rentalPolicy/RegularRentalPolicy/RegularRentalPolicy";
import { Movie } from "./Movie";

describe("Movie", () => {
  it("returns the correct title", () => {
    const movie = new Movie("Moana", new ChildrenRentalPolicy());
    expect(movie.getTitle()).toBe("Moana");
  });

  it("calculates charge via injected policy", () => {
    const movie = new Movie("Avengers", new RegularRentalPolicy());
    expect(movie.getCharge(5)).toBe(6.5);
  });

  it("calculates frequent renter points via injected policy", () => {
    const movie = new Movie("Dune 2", new NewReleaseRentalPolicy());
    expect(movie.getFrequentRenterPoints(3)).toBe(2);
  });
});
