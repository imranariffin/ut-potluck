//schemas

var mongoose = require('mongoose');

exports.voteSchema = mongoose.Schema({
	candidate : String,
	update_at : Date
});

exports.candidateSchema = mongoose.Schema({
	name : String,
	categories : {		
		category_1 : Number,
		category_2 : Number,
		category_3 : Number
	},
	updated_at : Date
});

exports.voterSchema = mongoose.Schema({
	access_code : Number,
	candidates : {
		category_1 : String,
		category_2 : String,
		category_3 : String
	},
	has_voted : Boolean,
	updated_at : Date
})