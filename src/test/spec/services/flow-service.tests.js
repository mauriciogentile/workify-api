var expect = require('chai').expect;
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

describe('FlowService Tests', function () {
    var flowService;
    var validFlow;
    var failedFlow;
    var invalidFlow;

    beforeEach(function () {
        flowService = proxyquire('../../../app/services/flow-service',
        {
            '../repositories/mongo/flow-repository.js': {
                saveNew: function (a, cb) {
                    if (a.shouldFail) {
                        cb(new Error("error saviing " + a.name));
                        return;
                    }
                    cb(null, {});
                }
            }
        });
        validFlow = {
            name: "my flow", createdBy: "mauri", createdOn: new Date(),
            states: [{ name: "a" }, { name: "b" }],
            actions: [{ name: 'go', from: 'a', to: 'b' }]
        };
        failedFlow = Object.create(validFlow);
        failedFlow.shouldFail = true;
        invalidFlow = { name: "error" };
    });

    describe('saveNew', function () {
        it('should be a function', function (done) {
            expect(flowService.saveNew).to.be.a('function');
            done();
        });

        it('should call back after save', function (done) {
            flowService.saveNew(validFlow, function (err, data) {
                expect(err).to.be.null;
                expect(data).to.not.be.undefined;
                done();
            });
        });

        it('should call back with error if invalid flow', function (done) {
            flowService.saveNew(invalidFlow, function (err, data) {
                expect(err).to.not.be.null;
                expect(err).to.not.be.undefined;
                expect(data).to.be.undefined;
                done();
            });
        });

        it('should call back with error if fails to save', function (done) {
            flowService.saveNew(failedFlow, function (err, data) {
                expect(err).to.not.be.null;
                expect(err).to.not.be.undefined;
                expect(data).to.be.undefined;
                done();
            });
        });
    });
});