/**
 * Created by Nois on 2016. 12. 8..
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var levelSchema = new Schema({
    id: Number,
    levelTable : [],
    designer: String
});

module.exports = mongoose.model('user', levelSchema);