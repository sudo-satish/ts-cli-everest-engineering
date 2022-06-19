import { VehicleDetails } from "./common/interfaces";
import { Package } from "./Package";
import { Vehicle } from "./Vehicle";

export class VehicleManager {

  /**
   * Caluclate delivery time for each package as per given vehicle details.
   * @param packages Array of package instances.
   * @param vehicleDetails Vehicle details 
   */
  calculateTime(packages: Package[], vehicleDetails: VehicleDetails) {
    const {noOfVehicle, maxCarriableWeight, maxSpeed} = vehicleDetails;
    const packagesPair = this.getPairs(packages, maxCarriableWeight).reverse();
    const vehicles = Array(noOfVehicle).fill(0).map((_, i) => new Vehicle(i, maxSpeed, maxCarriableWeight));
    let allPackagesDelivered = false;
    const packagesArrCloned = [...packagesPair.reverse()];
    while(!allPackagesDelivered) {
      const pkg = packagesArrCloned.pop();
      if (!pkg) {
        allPackagesDelivered = true;
      } else {
        const vehicle = vehicles.sort((v1, v2) => v1.time - v2.time)[0];
        vehicle.calculateTime(pkg);
      }
    }
  }

  /**
   * Get pair of packages of which is close to maximum load for a vehicle.
   * @param packages Array of packages
   * @param maxLoad 
   * @returns Paired packages
   */
  getPairs(packages: Package[], maxLoad: number): ([Package, Package] | Package)[] {
    let closestWeightPairs: ([Package, Package] | Package)[] = [];
    let x = maxLoad;
    let arr = [...packages];
    let mayHavePair = true;
    while(mayHavePair) {
        const [i, j] = this.getClosest(arr, x);
        if (i === null) {
          mayHavePair = false;
        } else {
          closestWeightPairs.push([
            arr[+i],
            arr[+j!]
          ]);
          arr.splice(+i, 1);
          arr.splice(+j!-1, 1);
        }
    }
    if (arr.length > 0) {
      closestWeightPairs = closestWeightPairs.concat(arr).sort((pkg1, pkg2) => {
        return this.getPackageWeight(pkg1) - this.getPackageWeight(pkg2);
      });
    }

    return closestWeightPairs;
  }

  /**
   * If argument is array then return sum of weights or else return weight of single package.
   * 
   * @param pkg [Package, Package] | Package
   * @returns Total weight
   */
  getPackageWeight(pkg: [Package, Package] | Package): number {
    let pkg1Weight = 0;
    if (Array.isArray(pkg)) {
      pkg.forEach(pkg => {
        pkg1Weight += pkg.packageDetails.packageWeight
      })
    } else {
      pkg1Weight = pkg.packageDetails.packageWeight;
    }
    return pkg1Weight;
  }

  /**
   * Returns the closest pair to the maximum weight.
   * @param packageArr 
   * @param sum 
   * @returns 
   */
  getClosest(packageArr: Package[], sum: number) {
    let first: number | null = null, second: number | null = null;
    let firstIndex: number | string | null = null, secondIndex: number | string | null = null;
    let arr = packageArr.map(((packag) => packag.packageDetails.packageWeight));
    for(let i in arr) {
       for(let j in arr) {
          if(i != j) {
             let tmp = arr[i] + arr[j];
             if(tmp <= sum && tmp > (first ?? 0) + (second ?? 0)) {
                first = arr[i];
                second = arr[j];
                firstIndex = i;
                secondIndex = j;
             }
          };
       };
    };
    return [firstIndex, secondIndex];
  };
}

new VehicleManager();

