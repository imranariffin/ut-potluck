//schemas

var mongoose = require('mongoose');

exports.voteSchema = mongoose.Schema({
	candidate : String,
	update_at : Date
});

exports.candidateSchema = mongoose.Schema({
	name : String,
	num_vote : {		
		category_1 : Number,
		category_2 : Number,
		category_3 : Number
	},	
	update_at : Date
});

exports.voterSchema = mongoose.Schema({
	access_code : Number,
	candidate : {
		category_1 : String,
		category_2 : String,
		category_3 : String
	},
	voted : Boolean,
	update_at : Date
})