//display route
var mongoose = require('mongoose');
var schemas = require('../schemas/schemas');

var Vote = mongoose.model('vote', schemas.voteSchema);

exports.display = function (req, res) {
	Vote.find( function (err, votes, count) {
		if (err) {
			console.error(err);
			return err;
		}

		var voteList = [];

		for (var vote in votes) {
			voteList.push(votes[vote]["candidate"]);
			console.log(votes[vote]["candidate"]);
		}

		res.render ('result', {
			voteList : voteList
		});
	});
	console.log('rendering');
};
