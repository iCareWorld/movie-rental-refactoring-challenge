import { PriceCodeRegistry } from "../services/priceCodeRegistry";
import { Customer } from "./customer";
import { Movie } from "./movie";
import { PriceCodeType } from "./priceCodes/priceCode";

/**
 * Represents a video rental store.
 * This class manages the inventory of movies and the list of customers.
 * 
 * @property {Movie[]} movies  The movies registered in the store
 * @property {Customer[]} customers  The customers registered in the store
 */
export class Store {

    private _priceCodeRegistry = PriceCodeRegistry.getInstance();

    readonly movies: Movie[] = [];
    readonly customers: Customer[] = [];

    /**
     * Creates a new movie, adds it to the store's inventory, and returns it.
     * @param {string} name  The title of the movie.
     * @param {PriceCodeType} type The price code type for the movie
     * @returns {Movie} The newly created movie
     * @example
     * const store = new Store();
     * const movie = store.addMovie("Inception", NewReleasePriceCode);
     */
    addMovie(name: string, type: PriceCodeType): Movie {
        const priceCode = this._priceCodeRegistry.getPriceCode(type);
        const movie = new Movie(name, priceCode);
        this.movies.push(movie);
        return movie;
    }

    /**
     * Creates a new customer, registers them with the store, and returns the customer object.
     * @param {string} name The name of the new customer.
     * @returns {Customer} The newly created customer
    */
    addCustomer(name: string): Customer {
        const customer = new Customer(name);
        this.customers.push(customer);
        return customer;
    }
}