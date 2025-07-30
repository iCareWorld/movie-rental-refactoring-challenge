export abstract class Price {
    abstract getCharge(daysRented: number): number
    abstract getFrequentRenterPoints(daysRented: number): number
}

export class RegularPrice extends Price {
    getCharge(daysRented: number): number {
        let result = 2
        if (daysRented > 2) {
            result += (daysRented - 2) * 1.5
        }
        return result
    }

    getFrequentRenterPoints(_daysRented: number): number {
        return 1
    }
}

export class NewReleasePrice extends Price {
    getCharge(daysRented: number): number {
        return daysRented * 3
    }

    getFrequentRenterPoints(daysRented: number): number {
        return daysRented > 1 ? 2 : 1
    }
}

export class ChildrensPrice extends Price {
    getCharge(daysRented: number): number {
        let result = 1.5
        if (daysRented > 3) {
            result += (daysRented - 3) * 1.5
        }
        return result
    }

    getFrequentRenterPoints(_daysRented: number): number {
        return 1
    }
}