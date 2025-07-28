import { Customer } from "../domain/Customer/Customer";

export class StatementFormatter {
  format(customer: Customer): string {
    let result = `Rental record for ${customer.getName()}\n`;
    let totalAmount = 0;

    for (const rental of customer.getMovieRentalHistory()) {
      const movieTitle = rental.getMovie().getTitle();
      const thisAmount = rental.getCharge();
      totalAmount += thisAmount;
      result += `\t${movieTitle}\t${thisAmount}\n`;
    }

    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${customer.getFrequentRenterPoints()} frequent renter points.`;
    return result;
  }
}
