import { PriceCodeRegistry } from "../services/priceCodeRegistry";
import { Customer } from "./customer";
import { Movie } from "./movie";
import { PriceCodeType } from "./priceCodes/priceCode";

export class Store {

    private _priceCodeRegistry = PriceCodeRegistry.getInstance();

    readonly movies: Movie[] = [];
    readonly customers: Customer[] = [];

    addMovie(name: string, type: PriceCodeType): Movie {
        const priceCode = this._priceCodeRegistry.getPriceCode(type);
        const movie = new Movie(name, priceCode);
        this.movies.push(movie);
        return movie;
    }

    addCustomer(name: string): Customer {
        const customer = new Customer(name);
        this.customers.push(customer);
        return customer;
    }
}