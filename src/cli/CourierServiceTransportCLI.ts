
import {program} from 'commander';
import { CLI } from './CLI';
import { PackageDetailsRaw, PromptConfig, PromptConfigType, VehicleDetailsRaw } from '../common/interfaces';
import { PackageDetailsTransformer } from '../transformers/PackageDetailsTransformer';
import { PackageDetailValidator } from '../validators/PackageDetailValidator';
import { Package } from '../models/Package';
import { VehicleDetailsTransformer } from '../transformers/VehicleDetailsTransformer';
import { VehicleDetailValidator } from '../validators/VehicleDetailValidator';
import { VehicleManager } from '../helpers/VehicleManager';

interface BasicCLIDetails {
  baseFare: string;
  packages: string;
}

export class CourierServiceTransportCLI extends CLI {
  packageValidator = new PackageDetailValidator();
  vehicleValidator = new VehicleDetailValidator();
  packageTransformer = new PackageDetailsTransformer();
  vehicleTransformer = new VehicleDetailsTransformer();
  vehicleManager = new VehicleManager();

  /**
   * Entry point of CLI
   */
  async start() {
    const {packages, baseFare} = await this.parseArgs();
    this.logger.info('* Enter packages details in following format');
    this.logger.info('pkg_id pkg_weight_in_kg distance_in_km offer_code');

    const promptConfig = this.getPromptConfig(+packages);
    const {packageDetails: packageDetailsString} = await this.inquirer.prompt(promptConfig);

    this.logger.info('* Enter vehicle details in following format');
    this.logger.info('no_of_vehicles max_speed max_carriable_weight');
    const {vehicleDetails: vehicleDetailsString} = await this.inquirer.prompt([{
      type: PromptConfigType.input,
      name: 'vehicleDetails',
      message: 'Enter vehicle details'
    }]);
    const packageDetailsRaw = this.getPackageDetailsFromString(packageDetailsString);
    const vehicleDetailsRaw = this.getVehicleDetailsFromString(vehicleDetailsString);
    this.packageValidator.validate(packageDetailsRaw);
    this.vehicleValidator.validate(vehicleDetailsRaw);
    const packageDetails = this.packageTransformer.transform(packageDetailsRaw);
    const vehicleDetails = this.vehicleTransformer.transform(vehicleDetailsRaw);
    const packageList: Package[] = packageDetails.map((packageDetail) => new Package(packageDetail, +baseFare));
    this.vehicleManager.calculateTime(packageList, vehicleDetails);
    packageList.forEach((packag: Package) => this.logger.log(packag.toStringWithTime()));
  }

  /**
   * 
   * @param packageDetailsString Array of package detail string passed from CLI: ["pkgId 2 3 offerId"]
   * @returns 
   * @example
   * const [{packageId, packageWeight, distance, offerCode}, ...rest] = getPackageDetailsFromString(["pkgId 10 15 OFFER_1", "pkgId 10 15 OFFER_1"])
   */
  getPackageDetailsFromString(packageDetailsString: string[]): PackageDetailsRaw[] {
    const packages = packageDetailsString.map(packageDetail => {
      const [packageId, packageWeight, distance, offerCode] = packageDetail.split(' ');
      return {
        packageId, packageWeight, distance, offerCode,
      };
    });

    return packages;
  }

  /**
   * 
   * @param vehicleDetailsString Array of vehicle detail string passed from CLI: ["no_of_vehicle max_speed max_carriable_weight"]
   * @returns 
   * @example
   * const {noOfVehicle, maxSpeed, maxCarriableWeight} = getVehicleDetailsFromString("pkgId 10 15 OFFER_1")
   */
   getVehicleDetailsFromString(vehicleDetailsString: string): VehicleDetailsRaw {
    const [noOfVehicle, maxSpeed, maxCarriableWeight] = vehicleDetailsString.split(' ');
      return {
        noOfVehicle, maxSpeed, maxCarriableWeight
      };
  }

  /**
   * 
   * @param packages count of packages given from CLI option
   * @returns Prompt config for interactive CLI questions to ask package details 
   */
  getPromptConfig(packages: number): PromptConfig[] {
    const prompts = Array(+packages)
      .fill(0)
      .map((_, index) => ({
        type: PromptConfigType.input,
        name: `packageDetails.[${index}]`,
        message: `Enter package ${index+1} details`
      }));
    return prompts;
  }

  /**
   * 
   * @returns required cli options, baseFare and packages count
   * @example ```$ node lib/transporation.js --baseFare=100 --packages=5```
   */
  async parseArgs(): Promise<BasicCLIDetails> {
    program
      .version('0.0.1')
      .description("An CLI for calculating prize for package delivery")
      .requiredOption('-b, --baseFare <number>', 'Base Fare')
      .requiredOption('-p, --packages <number>', 'No of packages')
      .parse(process.argv);
    if (!process.argv.slice(2).length) {
      program.outputHelp();
    }
    const {baseFare, packages} : BasicCLIDetails  = program.opts();
    return {baseFare, packages};
  }
}
