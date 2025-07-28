import { RentalPolicy } from "../rentalPolicy/RentalPolicy";

export class Movie {
  constructor(
    private readonly title: string,
    private readonly pricingStrategy: RentalPolicy
  ) {}

  getTitle(): string {
    return this.title;
  }

  getCharge(daysRented: number): number {
    return this.pricingStrategy.calculatePrice(daysRented);
  }

  getFrequentRenterPoints(daysRented: number): number {
    return this.pricingStrategy.calculatePoints(daysRented);
  }
}
