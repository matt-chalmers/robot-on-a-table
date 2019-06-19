

import {Orientation, Pose, Turn} from "../src/RobotLib/Pose";


describe("Pose Tests", function() {

    describe("Basic step calculations", function() {

        it("Step North", function () {
            const pose = new Pose(1, 1, Orientation.North);
            expect(Pose.increment(pose)).toEqual(new Pose(1, 2, Orientation.North));
        });

        it("Step South", function () {
            const pose = new Pose(1, 1, Orientation.South);
            expect(Pose.increment(pose)).toEqual(new Pose(1, 0, Orientation.South));
        });

        it("Step East", function () {
            const pose = new Pose(1, 1, Orientation.East);
            expect(Pose.increment(pose)).toEqual(new Pose(2, 1, Orientation.East));
        });

        it("Step West", function () {
            const pose = new Pose(1, 1, Orientation.West);
            expect(Pose.increment(pose)).toEqual(new Pose(0, 1, Orientation.West));
        });
    });

    describe("Basic turn calculations", function() {

        it("Turn Left", function () {
            const pose = new Pose(1, 1, Orientation.North);
            expect(Pose.turn(pose, Turn.Left)).toEqual(new Pose(1, 1, Orientation.West));
        });

        it("Turn Left", function () {
            const pose = new Pose(1, 1, Orientation.West);
            expect(Pose.turn(pose, Turn.Left)).toEqual(new Pose(1, 1, Orientation.South));
        });

        it("Turn Left", function () {
            const pose = new Pose(1, 1, Orientation.South);
            expect(Pose.turn(pose, Turn.Left)).toEqual(new Pose(1, 1, Orientation.East));
        });

        it("Turn Left", function () {
            const pose = new Pose(1, 1, Orientation.East);
            expect(Pose.turn(pose, Turn.Left)).toEqual(new Pose(1, 1, Orientation.North));
        });


        it("Turn Right", function () {
            const pose = new Pose(1, 1, Orientation.North);
            expect(Pose.turn(pose, Turn.Right)).toEqual(new Pose(1, 1, Orientation.East));
        });

        it("Turn Right", function () {
            const pose = new Pose(1, 1, Orientation.East);
            expect(Pose.turn(pose, Turn.Right)).toEqual(new Pose(1, 1, Orientation.South));
        });

        it("Turn Right", function () {
            const pose = new Pose(1, 1, Orientation.South);
            expect(Pose.turn(pose, Turn.Right)).toEqual(new Pose(1, 1, Orientation.West));
        });

        it("Turn Right", function () {
            const pose = new Pose(1, 1, Orientation.West);
            expect(Pose.turn(pose, Turn.Right)).toEqual(new Pose(1, 1, Orientation.North));
        });

    });

});