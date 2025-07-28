import { Movie } from "./movie";
import { PriceCodeType } from "./priceCode";

export class Rental {
    readonly amountOwed: number 
    constructor(public readonly movie: Movie, public readonly daysRented: number) {
        this.amountOwed = this.calculateAmountOwed(movie, daysRented)
        console.log(`amountOwed ${this.amountOwed}`)
    }

    calculateAmountOwed(movie: Movie, daysRented: number) {
        console.log(`calculating amount owed for movie ${movie} and daysRented ${daysRented}`)
        let thisAmount = 0
        
        switch (movie.priceCode.type) {
            case PriceCodeType.Regular:
                console.log('pricde code type regular')
                console.log(`thisAmount ${thisAmount}`)
                thisAmount += 2
                if (daysRented > 2) {
                    thisAmount += ((daysRented - 2) * 1.5)
                }
                console.log(`thisAmount ${thisAmount}`)
                return thisAmount;

            case PriceCodeType.NewRelease:
                thisAmount += daysRented * 3
                return thisAmount;

            case PriceCodeType.Children:
                thisAmount += 1.5;
                if (daysRented > 3) {
                    thisAmount = (daysRented - 3) * 1.5
                }
                return thisAmount;
        }
    }

}