

import {Orientation, Position, Turn} from "../src/RobotLib/Position";


describe("Position Tests", function() {

    describe("Basic step calculations", function() {

        it("Step North", function () {
            const position = new Position(1, 1, Orientation.North);
            expect(Position.increment(position)).toEqual(new Position(1, 2, Orientation.North));
        });

        it("Step South", function () {
            const position = new Position(1, 1, Orientation.South);
            expect(Position.increment(position)).toEqual(new Position(1, 0, Orientation.South));
        });

        it("Step East", function () {
            const position = new Position(1, 1, Orientation.East);
            expect(Position.increment(position)).toEqual(new Position(2, 1, Orientation.East));
        });

        it("Step West", function () {
            const position = new Position(1, 1, Orientation.West);
            expect(Position.increment(position)).toEqual(new Position(0, 1, Orientation.West));
        });
    });

    describe("Basic turn calculations", function() {

        it("Turn Left", function () {
            const position = new Position(1, 1, Orientation.North);
            expect(Position.turn(position, Turn.Left)).toEqual(new Position(1, 1, Orientation.West));
        });

        it("Turn Left", function () {
            const position = new Position(1, 1, Orientation.West);
            expect(Position.turn(position, Turn.Left)).toEqual(new Position(1, 1, Orientation.South));
        });

        it("Turn Left", function () {
            const position = new Position(1, 1, Orientation.South);
            expect(Position.turn(position, Turn.Left)).toEqual(new Position(1, 1, Orientation.East));
        });

        it("Turn Left", function () {
            const position = new Position(1, 1, Orientation.East);
            expect(Position.turn(position, Turn.Left)).toEqual(new Position(1, 1, Orientation.North));
        });


        it("Turn Right", function () {
            const position = new Position(1, 1, Orientation.North);
            expect(Position.turn(position, Turn.Right)).toEqual(new Position(1, 1, Orientation.East));
        });

        it("Turn Right", function () {
            const position = new Position(1, 1, Orientation.East);
            expect(Position.turn(position, Turn.Right)).toEqual(new Position(1, 1, Orientation.South));
        });

        it("Turn Right", function () {
            const position = new Position(1, 1, Orientation.South);
            expect(Position.turn(position, Turn.Right)).toEqual(new Position(1, 1, Orientation.West));
        });

        it("Turn Right", function () {
            const position = new Position(1, 1, Orientation.West);
            expect(Position.turn(position, Turn.Right)).toEqual(new Position(1, 1, Orientation.North));
        });

    });

});