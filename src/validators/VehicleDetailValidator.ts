import { VehicleDetailsRaw } from "../common/interfaces";

/**
 * A helper class to validate the vehicle detail object
 */
export class VehicleDetailValidator {

  /**
   * 
   * @param vehicleDetails Vehilce details
   * @returns 
   * @throw
   * If vehicle detail is missing any of the required key "noOfVehicle, maxSpeed, maxCarriableWeight" it throws error
   */
  validate(vehicleDetails: VehicleDetailsRaw): VehicleDetailsRaw {
    const {noOfVehicle, maxSpeed, maxCarriableWeight} = vehicleDetails;
    if (!noOfVehicle) {
      throw new Error('Vehicle count is missing!');
    }
    if (!maxSpeed) {
      throw new Error('Max speed is missing!');
    }
    if (!maxCarriableWeight) {
      throw new Error('Max carriable weight is missing!');
    }
    return vehicleDetails;
  }
}