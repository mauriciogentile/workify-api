var flowRepository = require("../repositories/mongo/flow-repository.js");
var validator = require("./validators/flow-validator.js");
var validate = require("./validators/validate.js");

function FlowService() {
}

function lookupFlow(id) {
    return { id: id };
}

function saveNew(flow, cb) {
    validate.async(flow, validator)
        .then(function() { flowRepository.saveNew(flow, cb); })
        .catch(cb);
}

FlowService.prototype = {
    lookupFlow: lookupFlow,
    saveNew: saveNew
};

module.exports = new FlowService();
