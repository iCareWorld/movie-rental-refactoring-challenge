import {PriceCode} from "./price_code";

export class Movie {
    constructor(public readonly title: string, public readonly priceCode: PriceCode) {}
}
