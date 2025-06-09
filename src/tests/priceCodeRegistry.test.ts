import { NewReleasePriceCode } from "../models/priceCodes/newPriceCode";
import { RegularPriceCode } from "../models/priceCodes/regularPriceCode";
import { PriceCodeRegistry } from "../services/priceCodeRegistry";


describe('PriceCodeRegistry', () => {
    let registry: PriceCodeRegistry;

    beforeEach(() => {
        registry = PriceCodeRegistry.getInstance();
    });

    afterEach(() => {
        registry.clear();
    });

    it('should be a singleton, always returning the same instance', () => {
        const instance1 = PriceCodeRegistry.getInstance();
        const instance2 = PriceCodeRegistry.getInstance();
        expect(instance1).toBe(instance2);
    });

    it('should register a class and allow retrieval of its instance', () => {
        registry.register(RegularPriceCode);
        const instance = registry.getPriceCode(RegularPriceCode);
        expect(instance).toBeInstanceOf(RegularPriceCode);
    });

    it('should throw an error when trying to get an unregistered class', () => {
        expect(() => {
            registry.getPriceCode(NewReleasePriceCode);
        }).toThrow(Error);
    });
});