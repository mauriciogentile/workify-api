var expect = require('chai').expect;
var assert = require('chai').assert;

describe('FlowService Tests', function () {

    var flowService;

    beforeEach(function () {
        flowService = require('../../../app/services/flow-service');
    });

    describe('saveNew', function () {

        it('should be a function', function (done) {
            expect(flowService.saveNew).to.be.a('function');
            done();
        });

        it('should check integrity', function (done) {
            flowService.saveNew({ name: "myFlow" }, function (err) {
                assert(err, "should throw an error");
                done();
            });
        });

        it('should call cb', function (done) {
            flowService.saveNew({ name: "myFlow" }, function (err, data) {
                if (err) {
                    console.dir(err);
                }
                done();
            });
        });

    });
});
