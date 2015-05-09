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
			console.log("candidates: " + data[0]["name"]);

			//organize by category
			var category_list = orgByCategory(data);

			res.send(category_list);
			// res.render( 'index', {
			// 	candidates : data
			// });
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
		console.log("name: " + name);
		//populate categori scores into a list
		var categories = candidate["categories"];
		//console.log("candidate[\"categories\"]: " + candidate["categories"]);

		score_1 = categories["category_1"];
		console.log("score_1: " + score_1);
		c1.push([name, score_1]);
		console.log("c1[0]: " + c1[0]);
		console.log("c1[0][0]: " + c1[0][0]);
		console.log("c1: " + c1);
		score_2 = categories["category_2"];
		console.log("score_2: " + score_2);
		c2.push([name, score_2]);
		score_3 = categories["category_3"];
		console.log("score_3: " + score_3);
		c3.push([name, score_3]);

		var categories = [];
		//console.log("i: " + i);
		//console.log("candidate: " + candidate);
		// categories[""]
	}
	var category_list = [c1, c2, c3];
	console.log("category_list: " + category_list);
	console.log("category_list[1][1][1]: " + category_list[1][1][0]);
	return category_list;
}
