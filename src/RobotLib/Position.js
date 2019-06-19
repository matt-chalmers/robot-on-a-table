
import logger from "../logging";


export const Turn = {
    Left: 'LEFT',
    Right: 'RIGHT',
};

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

export class Position {

    constructor(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    describe() {
        return `${this.x},${this.y},${this.orientation}`;
    }

    toString() { return this.describe(); }

    static increment(position) {
        const [xStep, yStep] = MOVEMENT_MAP[position.orientation];
        logger.debug('Position.increment: [xStep, yStep] = [%d, %d]', xStep, yStep);
        return new Position(position.x + xStep, position.y + yStep, position.orientation);
    }

    static turn(position, way) {
        const newOrientation =  Orientation.turn(position.orientation, way);
        logger.debug('Position.turn(%s): newOrientation = %s', way, newOrientation);
        return new Position(position.x, position.y, newOrientation);
    }
}