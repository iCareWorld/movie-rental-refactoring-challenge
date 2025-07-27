import { PriceCode } from "../constants/PriceCode";

export function calculatePrice(priceCode: PriceCode, daysRented: number) {
  switch (priceCode) {
    case PriceCode.REGULAR: {
      const extraDaysCharge = daysRented > 2 ? (daysRented - 2) * 1.5 : 0;

      return 2 + extraDaysCharge;
    }

    case PriceCode.NEW_RELEASE: {
      return daysRented * 3;
    }

    case PriceCode.CHILDREN: {
      return daysRented > 3 ? (daysRented - 3) * 1.5 : 1.5;
    }

    default: {
      throw new Error("Invalid price code");
    }
  }
}

export function calculatePointsEarned(
  priceCode: PriceCode,
  daysRented: number,
) {
  // bonus for a two-day new-release rental
  const bonusPoints =
    priceCode === PriceCode.NEW_RELEASE && daysRented > 1 ? 1 : 0;

  return 1 + bonusPoints;
}
