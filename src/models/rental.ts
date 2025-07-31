import {Movie} from "./movie";
import {Customer} from "./customer";

export class Rental {
    constructor(public readonly customer: Customer, public readonly movie: Movie, public readonly daysRented: number) {}
}
