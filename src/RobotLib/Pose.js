/*
    This module provides us with the ability to describe the placement of objects in space
    and calculate transitions to new placements.

    A Pose is a term used in robotics to describe a combination of the position and orientation
    for an object.
 */

import logger from "../logging";


// Allowed values for Turning in space
export const Turn = {
    Left: 'LEFT',
    Right: 'RIGHT',
};

// Allowed values for Orientation in space
export const Orientation = {
    North: 'NORTH',
    South: 'SOUTH',
    East: 'EAST',
    West: 'WEST',

    turn: (orientation, way) => TURNS_MAP[orientation][way]
};

const TURNS_MAP = {
    // [originalOrientation][turn] => newOrientation
    [Orientation.North] : {
        [Turn.Left]: Orientation.West,
        [Turn.Right]: Orientation.East,
    },
    [Orientation.South]: {
        [Turn.Left]: Orientation.East,
        [Turn.Right]: Orientation.West,
    },
    [Orientation.East]: {
        [Turn.Left]: Orientation.North,
        [Turn.Right]: Orientation.South,
    },
    [Orientation.West]: {
        [Turn.Left]: Orientation.South,
        [Turn.Right]: Orientation.North,
    },
};

const MOVEMENT_MAP = {
    // [Orientation] => [xstep, ystep]
    [Orientation.North]: [0,1],
    [Orientation.South]: [0,-1],
    [Orientation.East]: [1,0],
    [Orientation.West]: [-1,0],
};

export class Pose {

    /**
     * Construct a Pose in space, including position and orientation
     * @param {Number} x
     * @param {Number} y
     * @param {string} orientation
     * @constructor
     */
    constructor(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    describe() {
        return `${this.x},${this.y},${this.orientation}`;
    }

    toString() { return this.describe(); }

    /**
     * Provide a pose that is one step forward from the given pose
     * @param {Pose} pose
     * @return {Pose} next pose
     */
    static increment(pose) {
        const [xStep, yStep] = MOVEMENT_MAP[pose.orientation];
        logger.debug('Pose.increment: [xStep, yStep] = [%d, %d]', xStep, yStep);
        return new Pose(pose.x + xStep, pose.y + yStep, pose.orientation);
    }

    /**
     * Provide a pose that is turned 90 degrees from the given pose
     * @param {Pose} pose
     * @param {string} way
     * @return {Pose} turned pose
     */
    static turn(pose, way) {
        const newOrientation =  Orientation.turn(pose.orientation, way);
        logger.debug('Pose.turn(%s): newOrientation = %s', way, newOrientation);
        return new Pose(pose.x, pose.y, newOrientation);
    }
}