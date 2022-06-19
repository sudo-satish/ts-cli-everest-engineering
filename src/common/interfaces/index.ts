export enum PromptConfigType {
  input = 'input'
}

export interface PromptConfig {
  type: PromptConfigType.input;
  name: string;
  message: string;
}

export interface PackageDetailsRaw {
  packageId: string;
  packageWeight: string;
  distance: string;
  offerCode?: string;
}

export interface VehicleDetailsRaw {
  noOfVehicle: string;
  maxSpeed: string;
  maxCarriableWeight: string;
}

export interface PackageDetails {
  packageId: string;
  packageWeight: number;
  distance: number;
  offerCode?: string;
}

export interface VehicleDetails {
  noOfVehicle: number;
  maxSpeed: number;
  maxCarriableWeight: number;
}
