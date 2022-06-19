import inquirer from 'inquirer';
import { PromptConfig } from "./common/interfaces";

/**
 * Wrapper of inquirer
 * Official documentation: [Inquirer](https://www.npmjs.com/package/inquirer)
 */
export class Inquirer {
  /**
   * 
   * @param promptConfig Prompt config, Read more here [Inquirer](https://www.npmjs.com/package/inquirer)
   * @returns Answers from given by user
   */
  async prompt(promptConfig: PromptConfig[]): Promise<any>{
    return inquirer
      .prompt(promptConfig);
  }
}
