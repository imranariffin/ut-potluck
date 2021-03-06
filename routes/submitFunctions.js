//submit Functions

//setup
var mongoose = require('mongoose');
var schemas = require('../schemas/schemas');

//submit access_code
//find access_code
//if find=true	: 	save access_code
//					initialize voter data
var voterScheme = schemas.voterSchema;
var Voter = mongoose.model('Voter', voterScheme);

var candidateSchema = schemas.candidateSchema;
var Candidate = mongoose.model('Candidate', candidateSchema);

exports.submitCode = function (req, res) {
	//find first
	var id = req.body.code;
	Voter.find({}, function (err, data) {
		if (!err) {
			if (data.length!=0) 
				console.log("Success: voter.find()");
			else {
				console.log("data is empty");
				return false;
			}
			
			//get desired voter only
			var desired_voter = {};
			for (i in data) {
				var voter = data[i];
				if (voter["access_code"] === Number(id)) {
					desired_voter = voter;
				}
			}

			var size = getObjectSize(desired_voter);			
			//send respond only if desired_voter is not empty
			if (size!=0)
				res.send(desired_voter);
			else
				res.send(Number(-1));

		} else {
			console.log("Error: " + err);
		}
		//res.redirect('index');
	});
}

getObjectSize = function (object) {
	var size = 0;
	for (i in object) {
		if (object.hasOwnProperty(i))
			size++;
		}
	return size;
}

exports.submitVote = function (req, res) {
	var submitReq = {
		"access_code" : req.body.code,
		"vote1" : req.body.c1,
		"vote2" : req.body.c2,
		"vote3" : req.body.c3
	}

	//DEBUG
	console.log("access_code: " + submitReq["access_code"]);
	console.log("vote1: " + submitReq["vote1"]);
	console.log("vote2: " + submitReq["vote2"]);
	console.log("vote3: " + submitReq["vote3"]);

	//update Voter document
	var conditions = { access_code : Number(submitReq["access_code"]) };
	Voter.findOne(conditions, function (err, doc) {
		if (!err) {
			console.log("updating doc " + submitReq["access_code"]);
			console.log("doc.candidates: " + doc.candidates);
			doc.candidates.category_1 = submitReq["vote1"];		
			doc.candidates.category_2 = submitReq["vote2"];
			doc.candidates.category_3 = submitReq["vote3"];
			doc.has_voted = true;
			doc.update_at = Date.now();
			doc.save();

			res.send("update success");
		} else {
			console.log("Update Error: " + err);
		}
	});
	
	//update Candidates
	//update first candidate
	Candidate.findOne({ name : submitReq["vote1"] }, function (err, candidate) {
		if (!err) {
			var candidateName = submitReq["vote1"];
			console.log("updating doc " + submitReq["vote1"]);
			candidate.categories.category_1++;
			candidate.update_at = Date.now();
			candidate.save();
		} else {
			console.log("error update candidate: " + err);
		}
	});

	//update second candidate
	Candidate.findOne({ name : submitReq["vote2"] }, function (err, candidate2) {
		if (!err) {
			var candidateName = submitReq["vote2"];
			console.log("updating doc " + submitReq["vote2"]);
			candidate2.categories.category_2++;
			candidate2.update_at = Date.now();
			candidate2.save();
		} else {
			console.log("error update candidate: " + err);
		}
	});

	//update third candidate
	Candidate.findOne({ name : submitReq["vote3"] }, function (err, candidate3) {
		if (!err) {
			var candidateName = submitReq["vote3"];
			console.log("updating doc " + submitReq["vote3"]);
			candidate3.categories.category_3++;
			candidate3.update_at = Date.now();
			candidate3.save();
		} else {
			console.log("error update candidate: " + err);
		}
	});
}

