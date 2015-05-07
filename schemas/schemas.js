//schemas

var mongoose = require('mongoose');

exports.voteSchema = mongoose.Schema({
	candidate : String,
	update_at : Date
});
