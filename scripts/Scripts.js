//populateVoters.js

var mongoose = require('mongoose');

// mongoose.connect('mongodb://heroku_app36536831:nirdvg3k5j0p5i804g1u3k5nkc@ds031832.mongolab.com:31832/heroku_app36536831');
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, "connection error:"));
// db.once('open', function(callback) {
//   console.log("menjadi");
// });

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

exports.populateVoters = function (req, res) {

	//create blank candidates
	var candidates = {
		category_1 : "",
		category_2 : "",
		category_3 : ""
	};

	var numVoters = 30;
	for (var i=0; i<numVoters; i++) {
		//get  random access codes
		var lengthCode = 5;
		var access_code;
		do {
			access_code = generateAccessCode(lengthCode);
		} while (false/*access_code in db*/)		

		console.log(access_code);

		//create voter and send to db
		new Voter ({
			access_code : access_code,
			candidates : candidates,
			has_voted : false,
			update_at : Date.now()
		}).save( function( err, voter, count) {
			res.send('success');
		});
	}
};

generateAccessCode = function (length) {
	var access_code = String();

	//create one random number and append it to access_code
	var i=0;
	while (i<length) {
		do {
		var random_num = Math.floor(Math.random()*10);
		} while (random_num===0)

		access_code += String(random_num);
		i++;
	}
	access_code = Number(access_code);
	return access_code;
}

exports.deleteBlankVoters = function (req, res) {
	//get access_code from textinput
	// var access_code = req.body.todelete;	
	// console.log(access_code);
	// access_code = Number(access_code);



	//find(access_code) then remove
	Voter.find({has_voted : "false"}).remove().exec();	
	res.send("done");
}