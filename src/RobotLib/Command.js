/*
    This module provides a basic implementation of a simple Command pattern. Its purpose is to
    allow us to cleanly extend into using input sources other than the Console.
 */

import {Turn} from './Position';


class AbstractCommand {
    execute(robot) { return null; }
    toString() { return 'Command()'; }
}


// Concrete command classes:

export class Place extends AbstractCommand {
    constructor(position) {
        super();
        this.position = position;
    }

    execute(robot) { robot.place(this.position); }
    toString() { return `Place(${this.position.describe()})`; }
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
