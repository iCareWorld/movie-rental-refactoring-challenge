import { Invoice } from "./Invoice";
import { Movie } from "./Movie";
import { Rental } from "./Rental";

export class Customer {
  name: string;
  invoices: Invoice[];
  rentals: Rental[];

  constructor(name: string) {
    this.name = name;
    this.invoices = [];
    this.rentals = [];
  }

  addInvoice() {
    const newInvoice = new Invoice(this.name);
    this.invoices.push(newInvoice);

    return newInvoice;
  }
}
