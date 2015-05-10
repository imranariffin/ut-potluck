//get functions

//get candidates
//setup
var mongoose = require('mongoose');
var schemas = require('../schemas/schemas');
var candidateScheme = schemas.candidateSchema;
var Candidate = mongoose.model('Candidate', candidateScheme);

//function definition
exports.getCandidates = function (req, res) {

	//find all candidates
	Candidate.find( {}, function (err, data) {
		if (!err) {

			//organize by category
			var category_list = orgByCategory(data);
			//send to front
			res.send(category_list);
		} else {
			console.log("Error: " + err);
		}
	});
}

orgByCategory = function (candidates) {
	categories = [];
	var c1 = [];
	var c2 = [];
	var c3 = [];
	for (i in candidates) {
		var candidate = candidates[i];
		var name = candidate["name"];
		var categories = candidate["categories"];
		//get score
		score_1 = categories["category_1"];		
		score_2 = categories["category_2"];
		score_3 = categories["category_3"];
		//update list

		// filter candidate accoring to category
		var c1_names = [""];

		
		c1.push([name, score_1]);
		c2.push([name, score_2]);
		c3.push([name, score_3]);
	}
	var category_list = [c1, c2, c3];
	return category_list;
}

Voter = mongoose.model('Voter', schemas.voterSchema);

exports.getVoter = function (req, res) {
	Voter.findOne({ access_code : 97414 }, function (err, voter) {
		if (!err) {
			console.log("voter.access_code: " + voter.access_code);
			console.log("typeof(voter.has_voted):" + typeof(voter.has_voted));
			res.send(voter);
		} else {
			console.log("Error findOne: " + err);
		}
	})
}