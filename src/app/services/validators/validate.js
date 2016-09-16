var moment = require("moment");
var validate = require("validate.js");

function ValidationErrors(errors, options, attributes, constraints) {
    Error.captureStackTrace(this, this.constructor);
    this.errors = errors;
    this.options = options;
    this.attributes = attributes;
    this.constraints = constraints;
}
ValidationErrors.prototype = new Error();

function extend(validate) {
    validate.extend(validate.validators.datetime, {
        // The value is guaranteed not to be null or undefined but otherwise it
        // could be anything.
        parse: function (value, options) {
            return +moment.utc(value);
        },
        // Input is a unix timestamp
        format: function (value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        }
    });
}

var async = validate.async;

validate.async = function (model, contrains, options) {
    options = options || {};
    options.wrapErrors = options.wrapErrors || ValidationErrors;
    return async(model, contrains, options);
};

extend(validate);

module.exports = validate;