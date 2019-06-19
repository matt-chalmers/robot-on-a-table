

import {Orientation, Position} from "../src/RobotLib/Position";
import {RestrictToTableConstraint} from "../src/RobotLib/Constraint";
import {TableMap} from "../src/RobotLib/TableMap";



describe("Constraint Tests", function() {

    const tableMap = new TableMap({"height" : 5, "width" : 5});
    const constraint = new RestrictToTableConstraint(tableMap);


    describe("Restrict robot to table", function() {

        describe("Valid positions", function() {
            for (let x = 0; x <= tableMap.width - 1; x++) {
                for (let y = 0; y <= tableMap.height - 1; y++) {
                    it(`Valid Positions  (x,y) = (${x},${y})`, function () {
                        const position = new Position(x, y, Orientation.North);
                        expect(constraint.check(position)).toBe(true);
                    });
                }
            }
        });

        describe("Invalid Top and Bottom Edges", function() {
            for (let x = 0; x <= tableMap.width - 1; x++) {
                for (let y of [-1, tableMap.height]) {
                    it(`Invalid Positions (x,y) = (${x},${y})`, function () {
                        const position = new Position(x, y, Orientation.North);
                        expect(constraint.check(position)).toBe(false);
                    });
                }
            }
        });

        describe("Invalid Left and Right Edges", function() {
            for (let y = 0; y <= tableMap.height - 1; y++) {
                for (let x of [-1, tableMap.width]) {
                    it(`Invalid Positions (x,y) = (${x},${y})`, function () {
                        const position = new Position(x, y, Orientation.North);
                        expect(constraint.check(position)).toBe(false);
                    });
                }
            }
        });

        describe("Invalid Corners", function() {
            for (let x of [-1, tableMap.width]) {
                for (let y of [-1, tableMap.height]) {
                    it(`Invalid Positions (x,y) = (${x},${y})`, function () {
                        const position = new Position(x, y, Orientation.North);
                        expect(constraint.check(position)).toBe(false);
                    });
                }
            }
        });

    });

});