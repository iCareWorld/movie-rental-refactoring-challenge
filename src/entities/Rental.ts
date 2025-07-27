import { calculatePrice, calculatePointsEarned } from "../utils/rentalUtils";
import { Movie } from "./Movie";

export class Rental {
  public readonly price: number;
  public readonly pointsEarned: number;

  constructor(
    public readonly movie: Movie,
    public readonly daysRented: number,
  ) {
    this.price = calculatePrice(movie.priceCode, daysRented);
    this.pointsEarned = calculatePointsEarned(movie.priceCode, daysRented);
  }
}
