import { Inquirer } from '../helpers/Inquirer';
import { Logger } from '../helpers/Logger';

/**
 * An interface to write CLI
 */
export abstract class CLI {
  /**
   * @instance
   * Instance Of Logger
   */
  logger = new Logger();

  /**
   * @instance
   * Instance of Inquirer
   */
  inquirer = new Inquirer();

  /**
   * Every CLI must implement parseArgs which will use program to parse options given via CLI
   * @example
   * async parseArgs(): Promise<BasicCLIDetails> {
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
   */
  abstract parseArgs(): Promise<any>
}
