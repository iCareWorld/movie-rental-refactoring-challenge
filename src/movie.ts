import { PriceCode } from "./priceCode";

export class Movie {
    constructor(public readonly title: string, public readonly priceCode: PriceCode) {}
}