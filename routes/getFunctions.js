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
			res.send(data);
			// res.render( 'index', {
			// 	candidates : data
			// });
		} else {
			console.log("Error: " + err);
		}
	});
}