var service = require("./services/flow-service");


function FlowController() {
}

function get(req, res, next) {
    res.status(200).json({ hello: 'world' });
}

function post(req, res, next) {
    res.status(200).json({ hello: 'world' });
}

FlowController.prototype = {
    get: get,
    post: post
};

module.exports = new FlowController();