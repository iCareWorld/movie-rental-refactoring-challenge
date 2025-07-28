import { MovieRental } from "../MovieRental/MovieRental";

export class Customer {
  private rentals: MovieRental[] = [];

  constructor(private readonly name: string) {}

  addRental(rental: MovieRental): void {
    this.rentals.push(rental);
  }

  getName(): string {
    return this.name;
  }

  getMovieRentalHistory(): MovieRental[] {
    return this.rentals;
  }

  getFrequentRenterPoints(): number {
    return this.rentals.reduce(
      (sum, rental) => sum + rental.calculateRentalPoints(),
      0
    );
  }
}
