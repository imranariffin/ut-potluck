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

exports.submitCode = function (req, res) {
	//find first
	var id = req.body.code;
	console.log("req.body.code: " + id);
	Voter.find({}, function (err, data) {
		if (!err) {
			if (data.length!=0) 
				console.log("Success: Got ");
			else {
				console.log("data is empty");
				return false;
			}
			
			//get desired voter only
			var desired_voter = {};
			for (i in data) {
				var voter = data[i];
				if (voter["access_code"] === Number(id)) {
					//res.send(voter);
					desired_voter = voter;
					console.log("res.send(voter): " + voter);
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
