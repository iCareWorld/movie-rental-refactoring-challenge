import { PriceCode } from "../../constants/PriceCode";
import { calculatePointsEarned, calculatePrice } from "../../utils/rentalUtils";
import { Invoice } from "../Invoice";
import { Movie } from "../Movie";

describe("Invoice", () => {
  describe("addRental", () => {
    const movie = new Movie("Best movie ever", PriceCode.REGULAR);
    const customerName = "John Doe";

    const invoice = new Invoice(customerName);

    it("returns the new rental", () => {
      const newRental = invoice.addRental(movie, 5);

      expect(newRental.daysRented).toEqual(5);
      expect(newRental.movie).toBe(movie);
    });
  });

  describe("printInvoice", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(jest.fn);

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    const customerName = "John Doe";

    const invoice = new Invoice(customerName);

    const movie1 = new Movie("Best movie ever", PriceCode.REGULAR);
    const movie2 = new Movie("New best movie ever", PriceCode.NEW_RELEASE);

    const rental1 = invoice.addRental(movie1, 5);
    const rental2 = invoice.addRental(movie2, 5);

    invoice.printInvoice();

    it("prints the customer name", () => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `Rental record for ${customerName}`,
      );
    });

    it("prints the line items", () => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `\t${movie1.title}\t${rental1.price}\n\t${movie2.title}\t${rental2.price}\n`,
      );
    });

    it("prints the total price", () => {
      const expectedPrice =
        calculatePrice(movie1.priceCode, 5) +
        calculatePrice(movie2.priceCode, 5);

      expect(consoleSpy).toHaveBeenCalledWith(
        `Amount owed is ${expectedPrice}`,
      );
    });

    it("prints the expected points", () => {
      const expectedPoints =
        calculatePointsEarned(movie1.priceCode, 5) +
        calculatePointsEarned(movie2.priceCode, 5);

      expect(consoleSpy).toHaveBeenCalledWith(
        `You earned ${expectedPoints} frequent renter points.`,
      );
    });
  });
});
