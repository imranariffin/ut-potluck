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
		}).save( function ( err, voter, count) {
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

//reset one voter based on access_code
exports.resetVoter = function (req, res) {
	if (!req.body.code) {
		console.log("Error: req.body.code: null");
		res.send("Error: req.body.code: null");
		return false;
	}
	var criteria = { access_code : req.body.code };
	Voter.findOne( criteria, function (err, voter) {
		if (!err) {
			console.log("success: findOne");
			console.log("req.body.code: " + req.body.code);
			console.log("voter: " + voter);
			if (!voter) {
				console.log("voter is null");
				return -1;
			}
			
			//reset voter values
			voter.candidates.category_1 = "";
			voter.candidates.category_2 = "";
			voter.candidates.category_3 = "";
			voter.has_voted = false;
			voter.save();

			console.log("voter: " + voter);
			console.log("voter.access_code: " + voter.access_code);
			console.log("voter.candidates: " + voter["candidates"]);
			console.log("reset success");
		} else {
			console.log("Error resetVoter: Error findONe: " + err);
		}
	});
}

exports.resetAllVoters = function (req, res) {

	//option = {} for findAll
	Voter.find({}, function (err, data) {
		// console.log(data);

		for (i in data) {
			voter = data[i];
			if (voter.has_voted===true) {
				console.log("i: " + i);
				console.log("voter: " + voter);
			}	
			data[i].candidates.category_1 = "";
			data[i].candidates.category_2 = "";
			data[i].candidates.category_3 = "";
			data[i].has_voted = false;
			data[i].update_at = Date.now();

			//update message
			//console.log(voter);
			console.log("voter.access_code: " + voter.access_code);
		}
		data.save();
		res.send("sucess reset all");
	});
}

// findOneAndUpdate(conditions, update, callback)

//setup
//create Candidate schema
var candidateSchema = mongoose.Schema({
	name : String,
	categories : {		
		category_1 : Number,
		category_2 : Number,
		category_3 : Number
	},
	updated_at : Date
});

var Candidate = mongoose.model('candidate', candidateSchema);

var candidateList = [
"Afiq", 
"Anas", 
"Zahir", 
"Din", 
"Nik",
"Ipe",
"Fasu",
"OP",
"Haikal",
"Shuk",
"Zack",
"Nizhan",
"Eddy",
"Syamil",
"Hazwan",
"Nopal",
"Pooh",
"Amin"
];

exports.populateCandidates = function (req, res) {

	for (var i=0; i<candidateList.length; i++) {
		var candidateName = candidateList[i];
		console.log("candidateName: " + candidateName);
		//create new blank Candidate data
		new Candidate ({
			name : candidateName,
			categories : {
				category_1 : 0,
				category_2 : 0,
				category_3 : 0
			},
			update_at: Date.now()

		}).save( function ( err, candidate, count) {
			if (!err) {
			res.send("populate candidates success");
			} else {
			res.send(err);
			}		
		});
	}
}

//remove all candidates
exports.removeAllCandidates = function (req, res) {
	Candidate.find({}).remove().exec();	
	res.send("done removing all candidates");
}