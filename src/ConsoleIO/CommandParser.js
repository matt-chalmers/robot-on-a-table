/*
    This module provides the parsing implementation for converting raw input into
    defined commands. There are many ways to accomplish this task and the implementation
    is highly likely to be upgraded or swapped out in the future, hence this abstraction.
 */

import {Position, Orientation} from "../RobotLib/Position";
import * as Commands from '../RobotLib/Command';
import logger from '../logging';


const ORIENTATION_MAP = {
    'NORTH': Orientation.North,
    'SOUTH': Orientation.South,
    'EAST': Orientation.East,
    'WEST': Orientation.West,
};


export class CommandParser {

    /**
     * Convert a single line of raw input into a command
     * @param {string} commandString
     * @return {Command|null} command
     */
    parse(commandString) {
        let command = null;

        commandString = commandString.trim().toUpperCase();

        if (commandString === "MOVE") {
            command = new Commands.Move();

        } else if (commandString === "LEFT") {
            command = new Commands.TurnLeft();

        } else if (commandString === "RIGHT") {
            command = new Commands.TurnRight();

        } else if (commandString === "REPORT") {
            command = new Commands.Report();

        } else {
            const placeMatch = commandString.match(/^PLACE\s*(-?\d+)\s*,\s*(\d+)\s*,\s*(NORTH|SOUTH|EAST|WEST)$/);
            if (placeMatch) {
                const x = Number(placeMatch[1]);
                const y = Number(placeMatch[2]);
                const orientation = ORIENTATION_MAP[placeMatch[3]];
                const position = new Position(x,y,orientation);
                command = new Commands.Place(position);
            }
        }

        if (!command) {
            logger.warn('Unable to parse command: %s', commandString);
        }

        return command;
    }
}
