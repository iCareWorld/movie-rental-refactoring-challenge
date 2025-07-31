import {Rental} from "../models/rental";
import {PriceCode} from "../models/price_code";


export function calculateCostPerRental(rentals: Rental[]): Map<Rental, number> {
    return rentals.reduce((costMap, rental) => {
        costMap.set(rental, calculateRentalAmount(rental))
        return costMap
    }, new Map<Rental, number>())
}

export function calculateTotalRentalAmount(rentals: Rental[]): number {
    return Array.from(calculateCostPerRental(rentals).values())
        .reduce((total, rentalCost) => total + rentalCost, 0)
}

export function calculateTotalBonusPoints(rentals: Rental[]): number {
    let totalBonusPoints = rentals.length // Each rental earns at least one point
    for (const rental of rentals) {
        totalBonusPoints += calculateBonusPoints(rental)
    }
    return totalBonusPoints
}

export function calculateRentalAmount(rental: Rental): number {
    let rentalAmount = 0
    if (rental.movie.priceCode === PriceCode.REGULAR) {
        rentalAmount += 2
        if (rental.daysRented > 2) {
            rentalAmount += ((rental.daysRented - 2) * 1.5)
        }
    } else if (rental.movie.priceCode === PriceCode.NEW_RELEASE) {
        rentalAmount += rental.daysRented * 3
    } else if (rental.movie.priceCode === PriceCode.CHILDREN) {
        // for children, the first two days are free
        // and then $1.5 per day after that
        rentalAmount += 1.5;
        if (rental.daysRented > 3) {
            rentalAmount = (rental.daysRented - 3) * 1.5
        }
    }
    return rentalAmount;
}

export function calculateBonusPoints(rental: Rental): number {
    let bonus = 0;
    // add bonus for a two-day+ new-release rental
    if (rental.movie.priceCode === PriceCode.NEW_RELEASE && rental.daysRented > 1) {
        bonus++;
    }
    return bonus;
}
