var constraints = {
    name: {
        presence: true,
        length: {
            maximum: 50
        }
    },
    createdBy: {
        presence: true,
        length: {
            maximum: 20,
            minimum: 4
        }
    },
    createdOn: {
        presence: true,
        datetime: true
    },
    states: {
        presence: true,
        length: {
            minimum: 2
        }
    }
};

module.exports = constraints;
