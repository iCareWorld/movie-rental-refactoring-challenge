import { Store } from "./engine";
import { PriceCode } from "./constants/PriceCode";

const store = new Store();

describe("store", () => {
  describe("movies", () => {
    store.addMovie("Cinderella", PriceCode.CHILDREN);
    store.addMovie("Star Wars", PriceCode.REGULAR);
    store.addMovie("Gladiator", PriceCode.NEW_RELEASE);

    it("should be 3", () => {
      expect(store.movies.length).toBe(3);
    });

    it("should have the correct titles", () => {
      expect(store.movies[0].title).toBe("Cinderella");
      expect(store.movies[1].title).toBe("Star Wars");
      expect(store.movies[2].title).toBe("Gladiator");
    });

    it("should have the correct price codes", () => {
      expect(store.movies[0].priceCode).toBe(PriceCode.CHILDREN);
      expect(store.movies[1].priceCode).toBe(PriceCode.REGULAR);
      expect(store.movies[2].priceCode).toBe(PriceCode.NEW_RELEASE);
    });
  });

  describe("customers", () => {
    store.addCustomer("John Smith");

    it("should be 1", () => {
      expect(store.customers.length).toBe(1);
    });

    it("should have the correct name", () => {
      expect(store.customers[0].name).toBe("John Smith");
    });
  });
});
