

import {CommandParser} from "../src/ConsoleIO/CommandParser";
import * as Commands from '../src/RobotLib/Command';
import {Orientation, Pose} from "../src/RobotLib/Pose";


describe("Parsing Tests", function() {

    const parser = new CommandParser();

    describe("Basic command type matching", function() {

        it("RIGHT", function () {
            const command = parser.parse(' RIGHT ');
            expect(command).toEqual(jasmine.any(Commands.TurnRight));
        });

        it("LEFT", function () {
            const command = parser.parse(' LEFT ');
            expect(command).toEqual(jasmine.any(Commands.TurnLeft));
        });

        it("MOVE", function () {
            const command = parser.parse(' MOVE ');
            expect(command).toEqual(jasmine.any(Commands.Move));
        });

        it("REPORT", function () {
            const command = parser.parse(' REPORT ');
            expect(command).toEqual(jasmine.any(Commands.Report));
        });

        it("PLACE", function () {
            const command = parser.parse('  PLACE 123 , 123 , NORTH ');
            expect(command).toEqual(jasmine.any(Commands.Place));
        });

        it("Empty line", function () {
            const command = parser.parse('');
            expect(command).toBeNull();
        });

        it("Jibberish", function () {
            const command = parser.parse('asldkj asdkslpwn ww');
            expect(command).toBeNull();
        });


    });


    describe("Matching PLACE arguments", function() {

        const placeTests = [
            {test_direction: 'NORTH', orientation: Orientation.North},
            {test_direction: 'SOUTH', orientation: Orientation.South},
            {test_direction: 'EAST', orientation: Orientation.East},
            {test_direction: 'WEST', orientation: Orientation.West},
        ];

        for (const {test_direction, orientation} of placeTests) {
            it("Parse " + test_direction, function () {
                const command = parser.parse(`  PLACE 123 , 123 , ${test_direction} `);
                const expectedCommand = new Commands.Place(new Pose(123,123, orientation));
                expect(command).toEqual(expectedCommand);
            });
        }
    });

});