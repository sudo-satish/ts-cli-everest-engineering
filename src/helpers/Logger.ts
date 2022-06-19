import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

/**
 * A simple logger which logs info on console.
 */
export class Logger {
  /**
   * Clear console
   */
  clear() {
    clear();
  }

  /**
   * 
   * @param message Message to print on console
   */
  info(message: string) {
    console.log(chalk.yellow(message));
  }

  /**
   * 
   * @param message 
   */
  log(message: string) {
    console.log(chalk.green(message));
  }

  /**
   * 
   * @param message Message to print by [figlet](https://www.npmjs.com/package/figlet)
   */
  printWelcomeMessage(message: string) {
    console.log(
      chalk.red(
        figlet.textSync(message, { horizontalLayout: 'full' })
      )
    );
  }
}
