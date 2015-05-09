//populateVoters.js

var mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_app36536831:nirdvg3k5j0p5i804g1u3k5nkc@ds031832.mongolab.com:31832/heroku_app36536831');
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function(callback) {
  console.log("menjadi");
});

//create voter schema
var voterSchema = mongoose.Schema({
	access_code : Number,
	candidates : {
		category_1 : String,
		category_2 : String,
		category_3 : String
	},
	has_voted : Boolean,
	update_at : Date
})

//create Voter model based on voter schema
var Voter = mongoose.model('voter', voterSchema);

populateVoters = function (req, res) {

	//create blank candidates
	var candidates = {
		category_1 : "",
		category_2 : "",
		category_3 : ""
	};

	var numVoters = 30;
	for (var i=0; i<numVoters; i++) {
		//get  random access codes

		//create voter and send to db
		new Vote ({
			access_code : access_code,
			candidates : candidates,
			has_voted : false,
			update_at : Date.now()
		}).save( function( err, voter, count) {
			//res.redirect('/');
		});
	}
};