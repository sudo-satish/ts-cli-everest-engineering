import { VehicleDetails, VehicleDetailsRaw } from "../common/interfaces";

/**
 * A helper class to transform raw vehicle detail in desired data type
 */
export class VehicleDetailsTransformer {

  /**
   * 
   * @param vehicle Array of raw vehicle details given via CLI
   * @returns Array of vehicle details tranformed in desired data types
   */
  transform(vehicle: VehicleDetailsRaw): VehicleDetails {
    const {maxCarriableWeight, maxSpeed, noOfVehicle} = vehicle;
    return {maxCarriableWeight: +maxCarriableWeight, maxSpeed: +maxSpeed, noOfVehicle: +noOfVehicle};
  }
}
