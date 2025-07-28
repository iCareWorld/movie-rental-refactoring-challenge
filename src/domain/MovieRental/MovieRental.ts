import { Movie } from "../Movie/Movie";

export class MovieRental {
  constructor(
    private readonly movie: Movie,
    private readonly daysRented: number
  ) {}

  getMovie(): Movie {
    return this.movie;
  }

  getDaysRented(): number {
    return this.daysRented;
  }

  calculateRentalPoints(): number {
    return this.movie.getFrequentRenterPoints(this.daysRented);
  }

  getCharge(): number {
    return this.movie.getCharge(this.daysRented);
  }
}
