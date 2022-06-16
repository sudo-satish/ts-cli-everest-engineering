import { PackageDetails, PackageDetailsRaw } from "../common/interfaces";

/**
 * A helper class to transform raw package detail in desired data type
 */
export class PackageDetailsTransformer {

  /**
   * 
   * @param packageDetails Array of raw package details given via CLI
   * @returns Array of package details tranformed in desired data types
   */
  transform(packageDetails: PackageDetailsRaw[]): PackageDetails[] {
    return packageDetails
    .map(({packageWeight, distance, ...rest}) => ({...rest, packageWeight: +packageWeight, distance: +distance, ...rest}))
  }
}
