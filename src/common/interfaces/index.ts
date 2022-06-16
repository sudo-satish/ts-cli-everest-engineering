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

export interface PackageDetails {
  packageId: string;
  packageWeight: number;
  distance: number;
  offerCode?: string;
}
