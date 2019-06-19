import config from 'config';

import logger from './logging';
import {TableMap} from './RobotLib/TableMap';
import {Robot} from "./RobotLib/Robot";
import {RestrictToTableConstraint} from "./RobotLib/Constraint";
import {ConsoleClient} from "./ConsoleIO/ConsoleClient";


const USAGE_MSG = `Invalid command. Available commands are:
    PLACE X,Y,[NORTH|SOUTH|EAST|WEST]
    MOVE 
    LEFT 
    RIGHT 
    REPORT
`;

export class App {

    constructor() {
        this.robot = this._createRobot();
        this.client = new ConsoleClient((command) => this._handleCommand(command));
    }

    /**
     * Process a command from an IO source
     * @param {Command} command
     * @return {string} robot response
     */
    _handleCommand(command) {
        logger.debug('_handleCommand: %s', command);
        if ( command === null ) {
            return USAGE_MSG;
        } else {
            const response = command.execute(this.robot);
            logger.debug('_handleCommand response: %s', response);
            return response;
        }
    };

    /**
     * Create a robot using the application config
     * @return {Robot} robot
     */
    _createRobot() {
        const tableMap = new TableMap(config.table);
        const constraints = [new RestrictToTableConstraint(tableMap)];
        return new Robot(tableMap, constraints);
    }

    /**
     * Activate the robot and begin processing IO
     */
    run() {
        this.client.start();
    }
}
