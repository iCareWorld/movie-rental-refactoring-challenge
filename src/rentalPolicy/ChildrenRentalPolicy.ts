import { RentalPolicy } from "./RentalPolicy";

export class ChildrenRentalPolicy implements RentalPolicy {
  calculatePrice(daysRented: number): number {
    let result = 1.5;
    if (daysRented > 3) {
      result = (daysRented - 3) * 1.5;
    }

    return result;
  }

  calculatePoints(): number {
    return 1;
  }
}
