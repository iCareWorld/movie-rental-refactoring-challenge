import { PriceCode } from "./price-code";

export class Movie {
    constructor(public readonly title: string, public readonly priceCode: PriceCode) { }
}