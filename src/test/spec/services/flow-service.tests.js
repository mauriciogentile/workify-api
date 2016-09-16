var expect = require('chai').expect;
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

describe('FlowService Tests', function () {

    var flowService;
    var validFlow = { name: "my flow", createdBy: "mauri", createdOn: new Date() };
    var invalidFlow = { name: "error" };

    beforeEach(function () {
        flowService = proxyquire('../../../app/services/flow-service',
        {
            '../repositories/mongo/flow-repository.js': {
                saveNew: function (a, cb) {
                    if (a.name == "error") {
                        cb(new Error);
                        return;
                    }
                    cb(null, {});
                }
            }
        });
    });

    describe('saveNew', function () {

        it('should be a function', function (done) {
            expect(flowService.saveNew).to.be.a('function');
            done();
        });

        it('should call back with error if fails to save', function (done) {
            flowService.saveNew(invalidFlow, function (err, data) {
                expect(err).to.not.be.null;
                expect(err).to.not.be.undefined;
                expect(data).to.be.undefined;
                done();
            });
        });

        it('should call back after save', function (done) {
            flowService.saveNew(validFlow, function (err, data) {
                expect(err).to.be.null;
                expect(data).to.not.be.undefined;
                done();
            });
        });
    });
});