import { PricingStrategy } from "./pricing";

export class Movie {
    constructor(public readonly title: string, public readonly pricingStrategy: PricingStrategy) { }
}