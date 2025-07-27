import { PriceCode } from "../constants/PriceCode";

export function calculateCharge(priceCode: PriceCode, daysRented: number) {
  let thisAmount = 0;
  if (priceCode === PriceCode.REGULAR) {
    thisAmount += 2;
    if (daysRented > 2) {
      thisAmount += (daysRented - 2) * 1.5;
    }
  } else if (priceCode === PriceCode.NEW_RELEASE) {
    thisAmount += daysRented * 3;
  } else if (priceCode === PriceCode.CHILDREN) {
    thisAmount += 1.5;
    if (daysRented > 3) {
      thisAmount = (daysRented - 3) * 1.5;
    }
  }

  return thisAmount;
}
