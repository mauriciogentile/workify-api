var expect = require('chai').expect;
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

describe('FlowService Tests', function () {

    var flowService;

    beforeEach(function () {
        flowService = proxyquire('../../../app/services/flow-service',
        {
            './validators/validate.js': function () { },
            '../repositories/mongo/flow-repository.js': { saveNew: function (a, cb) { cb(); } }
        });
    });

    describe('saveNew', function () {

        it('should be a function', function (done) {
            expect(flowService.saveNew).to.be.a('function');
            done();
        });

        it('should call back with error if fails to save', function (done) {
            flowService.saveNew({ name: "myFlow" }, function (err, data) {
                expect(err).to.not.be.null;
                expect(data).to.be.undefined;
                done();
            });
        });

        it('should call back after save', function (done) {
            flowService.saveNew({ name: "myFlow" }, function (err, data) {
                expect(err).to.be.null;
                expect(data).to.not.be.undefined;
                done();
            });
        });
    });
});