import readline from "readline";
import logger from "../logging";
import os from "os";
import {CommandParser} from "./CommandParser";


export class ConsoleClient {
    constructor(commandHandler) {
        this.commandHandler = commandHandler;
        this.rl = null;
        this.parser = new CommandParser();
    }

    handleInput(input) {
        const command = this.parser.parse(input);
        return this.commandHandler(command);
    }

    start() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.rl.on('line', (input) => {
            logger.debug('ConsoleClient received: %s', input);
            const response = this.handleInput(input);
            if (response) {
                logger.debug('ConsoleClient sending response: %s', response);
                process.stdout.write(response + os.EOL);
            }
        });
    }
}