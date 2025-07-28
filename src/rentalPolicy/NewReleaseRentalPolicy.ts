import { RentalPolicy } from "./RentalPolicy";

export class NewReleaseRentalPolicy implements RentalPolicy {
  calculatePrice(daysRented: number): number {
    return daysRented * 3;
  }

  calculatePoints(daysRented: number): number {
    return daysRented > 1 ? 2 : 1;
  }
}
