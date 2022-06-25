import { Package } from "./Package";

/**
 * Represents the vehicle
 */
export class Vehicle {
  maxCarriableWeight: number;
  maxSpeed: number;
  time: number = 0;
  id: number;
  constructor(id: number, maxSpeed: number, maxCarriableWeight: number) {
    this.maxCarriableWeight = maxCarriableWeight;
    this.maxSpeed = maxSpeed;
    this.id = id;
  }

  /**
   * Calculate delivery time for each package.
   * 
   * @param packag Package [Package, Package] | Package
   */
  calculateTime(packag: Package[] | Package) {
    if (Array.isArray(packag)) {
      let tempTime = this.time;
      packag
        .sort((p1, p2) => p2.packageDetails.distance - p1.packageDetails.distance)
        .forEach((packag, index) => {
          const timeToDeliverPackage = (packag.packageDetails.distance/this.maxSpeed);
          packag.setTimeToDeliver(tempTime + timeToDeliverPackage);
          if(index === 0) {
            this.time = (this.time + (2*timeToDeliverPackage));
          }
        });
    } else {
      const timeToDeliverPackage = (packag.packageDetails.distance/this.maxSpeed);
      packag.setTimeToDeliver(this.time + timeToDeliverPackage);
      this.time = (this.time + (2*timeToDeliverPackage));
    }
  }
}