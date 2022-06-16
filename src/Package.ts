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

  constructor(packageDetails: PackageDetails, baseDeliveryCost: number) {
    this.packageDetails = packageDetails;
    this.costCalculator = new CostCalculator(baseDeliveryCost);
    this.costCalculator.calculateCost(packageDetails.packageWeight, packageDetails.distance, packageDetails.offerCode);
  }

  /**
   * Returns the printable string representation of package
   */
  toString(): string {
    return `${this.packageDetails.packageId} ${this.costCalculator.discountedCost} ${this.costCalculator.finalCost}`;
  }
}
