import { PackageDetailsRaw } from "../common/interfaces";

/**
 * A helper class to validate the package detail object
 */
export class PackageDetailValidator {

  /**
   * 
   * @param packageDetails Package details
   * @returns 
   * @throw
   * If package detail is missing any of the required key "packageId, packageWeight or distance" it throws error
   */
  validate(packageDetails: PackageDetailsRaw[]): PackageDetailsRaw[] {
    packageDetails.forEach(({packageId, packageWeight, distance}, index) => {
      if (!packageId) {
        throw new Error(`For package ${index+1} id is missing!`);
      }
      if (!packageWeight) {
        throw new Error(`For package ${index+1} weight is missing!`);
      }
      if (!distance) {
        throw new Error(`For package ${index+1} distance is missing!`);
      }
    })
    return packageDetails;
  }
}