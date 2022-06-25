
import {program} from 'commander';
import { CLI } from './CLI';
import { PackageDetailsRaw, PromptConfig, PromptConfigType } from '../common/interfaces';
import { PackageDetailsTransformer } from '../transformers/PackageDetailsTransformer';
import { PackageDetailValidator } from '../validators/PackageDetailValidator';
import { Package } from '../models/Package';

interface BasicCLIDetails {
  baseFare: string;
  packages: string;
}

interface CLIProps {
  packages: string,
  baseFare: string,
  packageDetailsString: string[],
}

export class CostEstimationCLI extends CLI {
  validator = new PackageDetailValidator();
  transformer = new PackageDetailsTransformer();

  /**
   * Get interactive props from CLI
   * @returns 
   */
  async getPropsFromCLI(): Promise<CLIProps> {
    const {packages, baseFare} = await this.parseArgs();
    this.logger.info('* Enter packages details in following format');
    this.logger.info('pkg_id pkg_weight_in_kg distance_in_km offer_code');

    const promptConfig = this.getPromptConfig(+packages);
    const {packageDetails: packageDetailsString} = await this.inquirer.prompt(promptConfig);

    return {
      packages,
      baseFare,
      packageDetailsString
    }
  }

  /**
   * calculate deliver cost
   * 
   * @param param
   * @returns 
   */
  calculateDeliveryCost({baseFare, packageDetailsString}: CLIProps): Package[] {
    const packageDetailsRaw = this.getPackageDetailsFromString(packageDetailsString);
    this.validator.validate(packageDetailsRaw);
    const packageDetails = this.transformer.transform(packageDetailsRaw);
    const packageList: Package[] = packageDetails.map((packageDetail) => new Package(packageDetail, +baseFare));
    return packageList;
  }

  /**
   * Entry point of CLI
   */
  async start() {
    const {
      packages,
      baseFare,
      packageDetailsString
    }  = await this.getPropsFromCLI();
    const packageList = this.calculateDeliveryCost({
      packages,
      baseFare,
      packageDetailsString
    })
    packageList.forEach((packag: Package) => this.logger.log(packag.toString()));
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
   * @example ```$ node lib/index.js --baseFare=100 --packages=2```
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
