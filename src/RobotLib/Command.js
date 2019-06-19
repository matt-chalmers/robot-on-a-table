/*
    This module provides a basic implementation of a simple Command pattern. Its purpose is to
    allow us to cleanly extend into using input sources other than the Console.
 */

import {Turn} from './Pose';


class AbstractCommand {

    /**
     * Execute the command using a robot
     * @param {Robot} robot
     * @return {string|null} robot response
     */
    execute(robot) { return null; }

    toString() { return 'Command()'; }
}


// Concrete command classes:

export class Place extends AbstractCommand {
    constructor(pose) {
        super();
        this.pose = pose;
    }

    execute(robot) { robot.place(this.pose); }
    toString() { return `Place(${this.pose.describe()})`; }
}

export class Move extends AbstractCommand {
    execute(robot) { robot.moveForward(); }
    toString() { return 'Move()'; }
}

export class TurnLeft extends AbstractCommand {
    execute(robot) { robot.turn(Turn.Left); }
    toString() { return `Turn(${Turn.Left})`; }
}

export class TurnRight extends AbstractCommand {
    execute(robot) { robot.turn(Turn.Right); }
    toString() { return `Turn(${Turn.Right})`; }
}

export class Report extends AbstractCommand {
    execute(robot) { return robot.report(); }
    toString() { return `Report()`; }
}
