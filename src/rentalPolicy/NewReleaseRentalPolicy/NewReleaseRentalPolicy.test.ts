import { NewReleaseRentalPolicy } from "./NewReleaseRentalPolicy";

describe("NewReleaseRentalPolicy", () => {
  const policy = new NewReleaseRentalPolicy();

  it("charges 3 per day rented", () => {
    expect(policy.calculatePrice(1)).toBe(3);
    expect(policy.calculatePrice(4)).toBe(12);
  });

  it("gives 2 frequent renter points if rented more than 1 day", () => {
    expect(policy.calculatePoints(2)).toBe(2);
    expect(policy.calculatePoints(10)).toBe(2);
  });

  it("gives 1 point if rented for 1 day or less", () => {
    expect(policy.calculatePoints(1)).toBe(1);
  });
});
