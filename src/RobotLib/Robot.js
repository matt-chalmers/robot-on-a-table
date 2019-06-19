
import {Position} from "./Position";
import logger from "../logging";

/*
    FIX ME - I'm 100% comfortable with the Robot class not reporting error conditions
    for unplaced robots or bad position requests etc. Consider a refactor to deal with
    Errors at the App level.
 */

export class Robot {

    /**
     * Construct a Robot
     * @param {TableMap} tableMap
     * @param {[PositionConstraint]} constraints
     * @constructor
     */
    constructor(tableMap, constraints) {
        this.position = null;
        this.constraints = constraints;
        this.tableMap = tableMap;
    }

    /**
     * Place the robot at a given table position.
     * Silently ignore invalid positions.
     * @param {Position} position
     */
    place(position) {
        if (this.constraints.every(x => x.check(position))) {
            logger.debug('Robot.place(%s) - position accepted', position);
            this.position = position;
        } else {
            logger.debug('Robot.place(%s) - failed constraints', position);
        }
    }

    /**
     * Move the robot forward one step from it's current position
     * Silently ignore an unplaced robot or invalid position.
     */
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

    /**
     * Turn the robot 90 degrees from its current direction
     * Silently ignore an unplaced robot.
     * @param {Turn} way
     */
    turn(way) {
        if ( this.position === null ) {
            logger.debug('Robot.turn() - ignored as robot is not yet placed');
            return;
        }

        this.position = Position.turn(this.position, way);
        logger.debug('Robot.turn() - turned %s', way);
    }

    /**
     * Report on the current position of the robot
     * Silently ignore an unplaced robot.
     * @return {string} position description
     */
    report() {
        if ( this.position === null ) {
            logger.debug('Robot.report() - ignored as robot is not yet placed');
            return null;
        }
        return this.position.describe();
    }
}
