
import {Turn} from './Position';


class Command {

    execute(robot) { return null; }
    toString() { return 'Command()'; }
}

export class Place extends Command {
    constructor(position) {
        super();
        this.position = position;
    }

    execute(robot) { robot.place(this.position); }
    toString() { return `Place(${this.position.describe()})`; }
}

export class Move extends Command {
    execute(robot) { robot.moveForward(); }
    toString() { return 'Move()'; }

}

export class TurnLeft extends Command {
    execute(robot) { robot.turn(Turn.Left); }
    toString() { return `Turn(${Turn.Left})`; }
}

export class TurnRight extends Command {
    execute(robot) { robot.turn(Turn.Right); }
    toString() { return `Turn(${Turn.Right})`; }
}

export class Report extends Command {
    execute(robot) { return robot.report(); }
    toString() { return `Report()`; }
}


