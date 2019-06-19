
import {Position} from "./Position";
import logger from "../logging";


export class Robot {

    constructor(tableMap, constraints) {
        this.position = null;
        this.constraints = constraints;
        this.tableMap = tableMap;
    }

    place(position) {
        if (this.constraints.every(x => x.check(position))) {
            logger.debug('Robot.place(%s) - position accepted', position);
            this.position = position;
        } else {
            logger.debug('Robot.place(%s) - failed constraints', position);
        }
    }

    moveForward() {
        if ( this.position === null ) {
            logger.debug('Robot.moveForward() - ignored as robot is not yet placed');
            return;
        }

        const newPosition = Position.increment(this.position);
        if (this.constraints.every(x => x.check(newPosition))) {
            logger.debug('Robot.moveForward() - position accepted: %s', newPosition);
            this.position = newPosition;
        } else {
            logger.debug('Robot.moveForward() - failed constraints: %s', newPosition);
        }
    }

    turn(way) {
        if ( this.position === null ) {
            logger.debug('Robot.turn() - ignored as robot is not yet placed');
            return;
        }
        
        this.position = Position.turn(this.position, way);
        logger.debug('Robot.turn() - turned %s', way);
    }

    report() {
        if ( this.position === null ) {
            logger.debug('Robot.report() - ignored as robot is not yet placed');
            return null;
        }
        return this.position.describe();
    }
}
