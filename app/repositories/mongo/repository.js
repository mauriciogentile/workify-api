var settings = require("../../config/settings/settings-config.js").settings;
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;

function Repository(col) {
    var self = this;
    self.collectionName = col;
    self.connString = settings["mongoConnString"];
    self.execute = function (action) {
        MongoClient.connect(self.connString, function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection(self.collectionName);
            collection.findById = function(id, callback) {
                collection.findOne({ "_id": new ObjectId(id) }, callback);
            };
            action(collection);
            return null;
        });
    }
}

module.exports = function(colName) {
    return new Repository(colName);
};