
import {Pose} from "./Pose";
import logger from "../logging";

/*
    FIX ME - I'm not 100% comfortable with the Robot class not reporting error conditions
    for unplaced robots or bad pose requests etc. Consider a refactor to deal with
    these "errors" at the App level instead.
 */

export class Robot {

    /**
     * Construct a Robot
     * @param {TableMap} tableMap
     * @param {[AbstractPositionConstraint]} constraints
     * @constructor
     */
    constructor(tableMap, constraints) {
        this.pose = null;
        this.constraints = constraints;
        this.tableMap = tableMap;
    }

    /**
     * Place the robot at a given table pose.
     * Silently ignore invalid poses.
     * @param {Pose} pose
     * @return {null}
     */
    place(pose) {
        if (this.constraints.every(x => x.check(pose))) {
            logger.debug('Robot.place(%s) - pose accepted', pose);
            this.pose = pose;
        } else {
            logger.debug('Robot.place(%s) - failed constraints', pose);
        }
        return null;
    }

    /**
     * Move the robot forward one step from it's current pose
     * Silently ignore an unplaced robot or invalid pose.
     * @return {null}
     */
    moveForward() {
        if ( this.pose === null ) {
            logger.debug('Robot.moveForward() - ignored as robot is not yet placed');
            return null;
        }

        const newPose = Pose.increment(this.pose);
        if (this.constraints.every(x => x.check(newPose))) {
            logger.debug('Robot.moveForward() - pose accepted: %s', newPose);
            this.pose = newPose;
        } else {
            logger.debug('Robot.moveForward() - failed constraints: %s', newPose);
        }
        return null;
    }

    /**
     * Turn the robot 90 degrees from its current direction
     * Silently ignore an unplaced robot.
     * @param {string} way
     * @return {null}
     */
    turn(way) {
        if ( this.pose === null ) {
            logger.debug('Robot.turn() - ignored as robot is not yet placed');
            return null;
        }

        this.pose = Pose.turn(this.pose, way);
        logger.debug('Robot.turn() - turned %s', way);
        return null;
    }

    /**
     * Report on the current pose of the robot
     * Silently ignore an unplaced robot.
     * @return {string|null} pose description
     */
    report() {
        if ( this.pose === null ) {
            logger.debug('Robot.report() - ignored as robot is not yet placed');
            return null;
        }
        return this.pose.describe();
    }
}
