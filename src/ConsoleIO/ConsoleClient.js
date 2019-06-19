import readline from "readline";
import logger from "../logging";
import os from "os";
import {CommandParser} from "./CommandParser";


const USAGE_MSG = `Invalid command. Available commands are:
    PLACE X,Y,[NORTH|SOUTH|EAST|WEST]
    MOVE 
    LEFT 
    RIGHT 
    REPORT
`;

export class ConsoleClient {
    /**
     * Construct a ConsoleClient using a command handler which will process
     * all commands that we detect from the client.
     * @param {function} commandHandler
     * @constructor
     */
    constructor(commandHandler) {
        this.commandHandler = commandHandler;
        this.rl = null;
        this.parser = new CommandParser();
    }

    /**
     * Execute a single line of input as a robot command
     * @param {string} input
     * @return {string|null} robot response
     */
    handleInput(input) {
        const command = this.parser.parse(input);
        if ( command === null ) {
            return USAGE_MSG;
        } else {
            return this.commandHandler(command);
        }
    }

    /**
     * Commence processing input from the console
     */
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