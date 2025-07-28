import { RegularRentalPolicy } from "./RegularRentalPolicy";

describe("RegularRentalPolicy", () => {
  const policy = new RegularRentalPolicy();

  it("charges 2 for up to 2 days", () => {
    expect(policy.calculatePrice(1)).toBe(2);
    expect(policy.calculatePrice(2)).toBe(2);
  });

  it("adds 1.5 per day after 2 days", () => {
    expect(policy.calculatePrice(5)).toBe(6.5);
  });

  it("always gives 1 frequent renter point", () => {
    expect(policy.calculatePoints()).toBe(1);
  });
});
