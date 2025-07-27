import { PriceCode } from "../constants/PriceCode";

export class Movie {
  constructor(
    public readonly title: string,
    public readonly priceCode: PriceCode,
  ) {}
}
