import { IPriceCode } from "./priceCodes/priceCode";

export class Movie {

    constructor(readonly title: string, readonly priceCode: IPriceCode) { }

}