import { CouponValidator } from "../validators/CouponValidator";

/**
 * It calculated the cost of a given package
 */
export class CostCalculator {
  baseDeliveryCost: number;
  weightRate: number = 10;
  distanceRate: number = 5;

  /**
   * Total Delivery Cost
   */
  public totalCost: number = 0;

  /**
   * Discounted Price
   */
  public discountedCost: number = 0;

  /**
   * Cost after deduction of discount
   */
  public finalCost: number = 0;


  /**
   * @intance
   * Instance of Coupon Validator
   */
  couponValidator = new CouponValidator();

  /**
   * 
   * @param baseDeliveryCost Base deliver cost
   */
  constructor(baseDeliveryCost: number) {
    this.baseDeliveryCost = baseDeliveryCost;
  }

  /**
   * Does the calculation on price
   * @param packageWeight 
   * @param distance 
   * @param couponCode 
   * @returns 
   */
  public calculateCost(packageWeight: number, distance: number, couponCode?: string) {
    let discount = 0;
    if (couponCode) {
      discount = this.couponValidator.validate(distance, packageWeight, couponCode);
    }

    const totalCost = this.calculateTotalCost(packageWeight, distance);
    const discountedCost = this.calculateDiscountedCost(totalCost, discount);
    const finalCost = this.calculateFinalCost(totalCost, discountedCost);
    this.totalCost = totalCost;
    this.discountedCost = discountedCost;
    this.finalCost = finalCost;
    return finalCost;
  }

  calculateTotalCost(packageWeight: number, distance: number): number {
    return this.baseDeliveryCost + (packageWeight * this.weightRate) + (distance * this.distanceRate)
  }

  calculateDiscountedCost(totalCost: number, discountPercentage: number): number {
    return (totalCost*(discountPercentage/100))
  }

  calculateFinalCost(totalCost: number, discountedCost: number): number {
    return totalCost - discountedCost;
  }
}
