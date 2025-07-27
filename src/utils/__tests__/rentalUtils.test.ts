import { PriceCode } from "../../constants/PriceCode";
import { calculatePointsEarned, calculatePrice } from "../rentalUtils";

describe("calculatePrice", () => {
  describe.each([
    [PriceCode.REGULAR, 1, 2],
    [PriceCode.REGULAR, 2, 2],
    [PriceCode.REGULAR, 3, 3.5],
    [PriceCode.NEW_RELEASE, 1, 3],
    [PriceCode.NEW_RELEASE, 3, 9],
    [PriceCode.CHILDREN, 1, 1.5],
    [PriceCode.CHILDREN, 4, 1.5],
    [PriceCode.CHILDREN, 5, 3],
  ])(
    "for Price Code %s rented for %s days",
    (priceCode, daysRented, expectedPrice) => {
      it(`returns ${expectedPrice}`, () => {
        const result = calculatePrice(priceCode, daysRented);
        expect(result).toBe(expectedPrice);
      });
    },
  );
});

describe("calculatePointsEarned", () => {
  describe.each([
    [PriceCode.REGULAR, 1, 1],
    [PriceCode.REGULAR, 2, 1],
    [PriceCode.NEW_RELEASE, 1, 1],
    [PriceCode.NEW_RELEASE, 2, 2],
    [PriceCode.CHILDREN, 1, 1],
    [PriceCode.CHILDREN, 2, 1],
  ])(
    "for Price Code %s rented for %s days",
    (priceCode, daysRented, expectedPoints) => {
      it(`returns ${expectedPoints}`, () => {
        const result = calculatePointsEarned(priceCode, daysRented);
        expect(result).toBe(expectedPoints);
      });
    },
  );
});
