import { RentalPolicy } from "./RentalPolicy";

export class RegularRentalPolicy implements RentalPolicy {
  calculatePrice(daysRented: number): number {
    let result = 2;
    if (daysRented > 2) {
      result += (daysRented - 2) * 1.5;
    }
    return result;
  }

  calculatePoints(): number {
    return 1;
  }
}
