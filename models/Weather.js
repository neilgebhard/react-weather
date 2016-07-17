var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    zip: Number,
    weather: {}
});

schema.statics.getState = function(id, callback) {
    Weather.find({ '_id': id }).exec(function(err, state) {
        callback(state[0]);
    });
};

module.exports = Weather = mongoose.model('Weather', schema);
