
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
