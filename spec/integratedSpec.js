
import {Orientation, Pose} from "../src/RobotLib/Pose";
import {App} from "../src/App";


/*
 Please NB: This is an INTEGRATED test module -- I am out of time to correctly unit test
 all the code layers, but I will use this module to provide us some higher level coverage as well.
 */


describe("Integrated Robot Tests", function() {

    describe("An Unplaced Robot", function() {

        let app = null;
        let client = null;

        beforeEach(() => {
            app = new App();
            client = app.client;
        });

        it("Move", function () {
            client.handleInput('MOVE');
            expect(client.handleInput('REPORT')).toBeNull();
        });

        it("Left", function () {
            client.handleInput('LEFT');
            expect(client.handleInput('REPORT')).toBeNull();
        });

        it("Right", function () {
            client.handleInput('RIGHT');
            expect(client.handleInput('REPORT')).toBeNull();
        });

        it("Report", function () {
            expect(client.handleInput('REPORT')).toBeNull();
        });

        it("Place", function () {
            client.handleInput('PLACE 1,1,NORTH');
            expect(client.handleInput('REPORT')).toEqual('1,1,NORTH');
        });
    });

    describe("A Placed Robot", function() {

        let app = null;
        let client = null;

        beforeEach(() => {
            app = new App();
            client = app.client;
            app.robot.pose = new Pose(1, 1, Orientation.North);
        });


        it("Move", function () {
            client.handleInput('MOVE');
            expect(client.handleInput('REPORT')).toEqual('1,2,NORTH');
        });

        it("Left", function () {
            client.handleInput('LEFT');
            expect(client.handleInput('REPORT')).toEqual('1,1,WEST');
        });

        it("Right", function () {
            client.handleInput('RIGHT');
            expect(client.handleInput('REPORT')).toEqual('1,1,EAST');
        });

        it("Report", function () {
            expect(client.handleInput('REPORT')).toEqual('1,1,NORTH');
        });

        it("Place", function () {
            client.handleInput('PLACE 2,2,NORTH');
            expect(client.handleInput('REPORT')).toEqual('2,2,NORTH');
        });
    });


    describe("Example Tests", function() {
        // These are the example tests provided in the challenge specification

        let app = null;
        let client = null;

        beforeEach(() => {
            app = new App();
            client = app.client;
        });

        it("Example Test 1", function () {
            client.handleInput('PLACE 0,0,NORTH');
            client.handleInput('MOVE');
            client.handleInput('REPORT');

            expect(client.handleInput('REPORT')).toEqual('0,1,NORTH');
        });

        it("Example Test 2", function () {
            client.handleInput('PLACE 0,0,NORTH');
            client.handleInput('LEFT');
            client.handleInput('REPORT');

            expect(client.handleInput('REPORT')).toEqual('0,0,WEST');
        });

        it("Example Test 3", function () {
            client.handleInput('PLACE 1,2,EAST');
            client.handleInput('MOVE');
            client.handleInput('MOVE');
            client.handleInput('LEFT');
            client.handleInput('MOVE');
            client.handleInput('REPORT');

            expect(client.handleInput('REPORT')).toEqual('3,3,NORTH');
        });
    });

});