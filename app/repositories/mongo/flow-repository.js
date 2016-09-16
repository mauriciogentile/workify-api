var repository = require("./repository.js")("flows");

function FlowRepository() {
}

function getFlowById(id, callback) {
    repository.execute(function (collection) {
        collection.findById(id, callback);
    });
}

function saveNew(flow, callback) {
    repository.execute(function (collection) {
        collection.insert(flow, callback);
    });
}

FlowRepository.prototype = {
    getFlowById: getFlowById,
    saveNew: saveNew
};

module.exports = new FlowRepository();