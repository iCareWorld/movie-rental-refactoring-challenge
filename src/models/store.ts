import { Customer } from "./customer";
import { Movie } from "./movie";
import { ChildrenPriceCode } from "./priceCodes/childrenPriceCode";
import { NewReleasePriceCode } from "./priceCodes/newPriceCode";
import { IPriceCode } from "./priceCodes/priceCode";
import { RegularPriceCode } from "./priceCodes/regularPriceCode";

export class Store {
    static readonly PRICE_CODE_REGULAR: IPriceCode = new RegularPriceCode();
    static readonly PRICE_CODE_CHILDREN: IPriceCode = new ChildrenPriceCode();
    static readonly PRICE_CODE_NEW_RELEASE: IPriceCode = new NewReleasePriceCode();

    readonly movies: Movie[] = [];
    readonly customers: Customer[] = [];

    addMovie(name: string, priceCode: IPriceCode): Movie {
        let movie = new Movie(name, priceCode);
        this.movies.push(movie);
        return movie;
    }

    addCustomer(name: string): Customer {
        let customer = new Customer(name);
        this.customers.push(customer);
        return customer;
    }
}