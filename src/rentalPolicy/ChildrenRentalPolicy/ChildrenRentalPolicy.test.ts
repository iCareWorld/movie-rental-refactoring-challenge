import { ChildrenRentalPolicy } from "./ChildrenRentalPolicy";

describe("ChildrenRentalPolicy", () => {
  const policy = new ChildrenRentalPolicy();

  it("charges 1.5 for 3 or fewer days", () => {
    expect(policy.calculatePrice(2)).toBe(1.5);
    expect(policy.calculatePrice(3)).toBe(1.5);
  });

  it("charges 1.5 per each extra day beyond 3 days", () => {
    expect(policy.calculatePrice(5)).toBe(3);
  });

  it("always gives 1 frequent renter point", () => {
    expect(policy.calculatePoints()).toBe(1);
    expect(policy.calculatePoints()).toBe(1);
  });
});
