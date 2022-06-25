import { VehicleDetails } from "../common/interfaces";
import { Package } from "../models/Package";
import { Vehicle } from "../models/Vehicle";

export class VehicleManager {

  /**
   * Caluclate delivery time for each package as per given vehicle details.
   * @param packages Array of package instances.
   * @param vehicleDetails Vehicle details 
   */
  calculateTime(packages: Package[], vehicleDetails: VehicleDetails) {
    const {noOfVehicle, maxCarriableWeight, maxSpeed} = vehicleDetails;
    const packagesPair = this.getPairs(packages, maxCarriableWeight);
    const vehicles = Array(noOfVehicle)
      .fill(0)
      .map((_, i) => new Vehicle(i, maxSpeed, maxCarriableWeight));
    const packagesArrCloned = [...packagesPair.reverse()];

    while(packagesArrCloned.length > 0) {
      const pkg = packagesArrCloned.pop();
      const vehicle = vehicles.sort((v1, v2) => v1.time - v2.time)[0];
      vehicle.calculateTime(pkg!);
    }
  }

  /**
   * Get pair of packages of which is close to maximum load for a vehicle.
   * @param packages Array of packages
   * @param maxLoad 
   * @returns Paired packages
   */
  getPairs(packages: Package[], maxLoad: number): (Package[])[] {
    let closestWeightPairs: (Package[])[] = [];
    let x = maxLoad;
    let arr = [...packages];
    while(arr.length) {
        const arrPk = this.getCombinations(arr, x);
        closestWeightPairs.push(arrPk);
        arrPk.forEach((pkg => {
          arr.splice(arr.findIndex((p: Package) => p.packageDetails.packageId === pkg.packageDetails.packageId), 1);
        }));
    }
    return closestWeightPairs;
  }

  /**
   * If argument is array then return sum of weights or else return weight of single package.
   * 
   * @param pkg Package[]
   * @returns Total weight
   */
  getPackageWeight(pkg: Package[]): number {
    let pkg1Weight = 0;
    pkg.forEach(pkg => {
      pkg1Weight += pkg.packageDetails.packageWeight
    })
    return pkg1Weight;
  }

  /**
   * Returns the combination of packages which has weight sum closest to vehicle weight.
   * 
   * @param packageArr 
   * @param sum 
   * @returns 
   */
  getCombinations(packageArr: Package[], sum: number): Package[] {
    function add(a: number, b: Package) {
      return a + b.packageDetails.packageWeight;
    };

    function fork(i: number, t: Package[]) {
        var r = (result[0] || []).reduce(add, 0),
            s = t.reduce(add, 0);
        if (i === packageArr.length || s > sum) {
            if (s <= sum && t.length && r <= s) {
                if (r < s) {
                    result = [];
                }
                result.push(t);
            }
            return;
        }
        fork(i + 1, t.concat([packageArr[i]]));
        fork(i + 1, t);
    }

    var result: (Package[])[] = [];
    fork(0, []);
    return result[0];
  }
}
