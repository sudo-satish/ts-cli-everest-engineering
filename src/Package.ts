import { PackageDetails } from "./common/interfaces";
import { CostCalculator } from "./CostCalculator";

/**
 * A class representing a package
 */
export class Package {
  packageDetails: PackageDetails;

  /**
   * Cost Calculator for a package
   */
  public costCalculator: CostCalculator;
  public timeToDeliver?: number;

  setTimeToDeliver(time: number) {
    this.timeToDeliver = time;
  }

  constructor(packageDetails: PackageDetails, baseDeliveryCost: number) {
    this.packageDetails = packageDetails;
    this.costCalculator = new CostCalculator(baseDeliveryCost);
    this.costCalculator.calculateCost(packageDetails.packageWeight, packageDetails.distance, packageDetails.offerCode);
  }

  /**
   * Returns the printable string representation of package
   * @returns Printable format of Package representation
   */
  toString(): string {
    return `${this.packageDetails.packageId} ${this.costCalculator.discountedCost} ${this.costCalculator.finalCost}`;
  }

  /**
   * Returns the printable string representation of package with time
   * @returns Printable format of Package representation with time
   */
  toStringWithTime(): string {
    return `${this.packageDetails.packageId} ${this.costCalculator.discountedCost} ${this.costCalculator.finalCost} ${this.timeToDeliver}`;
  }
}
