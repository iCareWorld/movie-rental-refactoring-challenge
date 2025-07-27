import { Invoice } from "./Invoice";

export class Customer {
  name: string;
  invoices: Invoice[];

  constructor(name: string) {
    this.name = name;
    this.invoices = [];
  }

  addInvoice() {
    const newInvoice = new Invoice(this.name);
    this.invoices.push(newInvoice);

    return newInvoice;
  }
}
