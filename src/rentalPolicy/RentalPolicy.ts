export interface RentalPolicy {
  calculatePrice(daysRented: number): number;
  calculatePoints(daysRented: number): number;
}
