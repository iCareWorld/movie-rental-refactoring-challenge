import { ChildrenPriceCode } from "../models/priceCodes/childrenPriceCode";
import { NewReleasePriceCode } from "../models/priceCodes/newPriceCode";
import { RegularPriceCode } from "../models/priceCodes/regularPriceCode";


describe('RegularPriceCode', () => {
    const priceCode = new RegularPriceCode();

    it.each([
        [1, 2],
        [2, 2],
        [3, 3.5],
    ])('should calculate amount for %i day(s) as %f', (days, expectedAmount) => {
        expect(priceCode.getAmount(days)).toBe(expectedAmount);
    });

    it('should always award 1 frequent renter point', () => {
        expect(priceCode.getFrequentRenterPoints(10)).toBe(1);
    });

    it('should have the correct name', () => {
        expect(priceCode.name).toBe('REGULAR');
    });
});

describe('NewReleasePriceCode', () => {
    const priceCode = new NewReleasePriceCode();

    it('should calculate amount as 3 per day', () => {
        expect(priceCode.getAmount(5)).toBe(15);
    });

    it('should award 1 point for a 1-day rental (at bonus boundary)', () => {
        expect(priceCode.getFrequentRenterPoints(1)).toBe(1);
    });
    
    it('should award 2 points for rentals longer than 1 day (over bonus boundary)', () => {
        expect(priceCode.getFrequentRenterPoints(2)).toBe(2);
    });

    it('should have the correct name', () => {
        expect(priceCode.name).toBe('NEW RELEASE');
    });
});

describe('ChildrenPriceCode', () => {
    const priceCode = new ChildrenPriceCode();

    it.each([
        [2, 1.5],
        [3, 1.5],
        [4, 1.5],
        [6, 4.5],
    ])('should calculate amount for %i day(s) as %f', (days, expectedAmount) => {
        expect(priceCode.getAmount(days)).toBe(expectedAmount);
    });

    it('should always award 1 frequent renter point', () => {
        expect(priceCode.getFrequentRenterPoints(10)).toBe(1);
    });

    it('should have the correct name', () => {
        expect(priceCode.name).toBe('CHILDREN');
    });
});