var moment = require("moment");
var validate = require("validate.js");

function ValidationError(errors, options, attributes, constraints) {
    this.stack = (new Error()).stack;
    this.errors = errors;
    this.options = options;
    this.attributes = attributes;
    this.constraints = constraints;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

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
    options.wrapErrors = options.wrapErrors || ValidationError;
    return async(model, contrains, options);
};

extend(validate);

module.exports = validate;