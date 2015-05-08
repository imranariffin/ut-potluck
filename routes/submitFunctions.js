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
	Voter.find(function (err, found) {
		if (err) {
			console.log("find error " + err);
			return false;
		}
		if (!found.voted) {
			console.log(found);
			new Voter ({
				access_code : id,
				candidate : {		
					category_1 : "",
					category_2 : "",
					category_3 : ""
				},
				voted : true,
				update_at : Date.now()
			}).save( function (err, Voter, count) {
					if (err) {
						console.log("save error " +err);
						return false;
					}
			});
			found.voted = "true";
			//found.save( function (err, voter, count) {res.redirect('/');});
			console.log("found.voted changed to " + found.voted);
			//res.redirect('/');
			console.log("created new blank voter");
		} else {
			console.log("already voted");
		}
	});
}
