import { Movie } from "./movie"
import { PriceCode, PriceCodeType } from "./priceCode"
import { Rental } from "./rental"

describe("rental", () => {
    
    it.only("should calculate amount for regular", () => {
        const star_wars  = new Movie('Star Wars', new PriceCode(PriceCodeType.Regular))
        console.log(star_wars);
        console.log(`${star_wars.title} | ${star_wars.priceCode.name} | ${star_wars.priceCode.name}`)

        let rental = new Rental(star_wars, 5)

        expect(rental.amountOwed).toBe(6.5);

    })
})