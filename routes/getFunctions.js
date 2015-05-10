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
		//c1 : BOTY
		var c1_names = ["Afiq", "Zahir", "Din", "Nik","Ipe","Haikal","Shuk","Zack","Nizhan","Eddy","Syamil","Hazwan","Nopal","Pooh", "OP"];
		//c2 :  utuh
		var c2_names = ["Afiq", "Zahir", "Din", "Nik","Ipe","OP","Zack","Nizhan","Syamil","Hazwan","Nopal","Pooh","Fiq"];
		//c3 : oboy
		var c3_names = ["Anas", "Zahir", "Din", "Haikal","Shuk","Zack","Nizhan", "Zul", "Fiq"];
// var candidateList = ["Afiq", "Anas", "Zahir", "Din", "Nik","Ipe","Fasu","OP","Haikal","Shuk","Zack","Nizhan","Eddy","Syamil","Hazwan","Nopal","Pooh","Amin"];
		
		if (isExist(name, c1_names)) {
			c1.push([name, score_1]);
		}
		if (isExist(name, c2_names)) {
			c2.push([name, score_2]);
		}
		if (isExist(name, c3_names)) {
			c3.push([name, score_3]);
		}
	}

	//randomize positiion 
	//of candidates in each candidate list c1,c2,c3
	// c1 = randomizeData(c1);
	// c2 = randomizeData(c2);
	// c3 = randomizeData(c3);

	//ready for return
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

isExist = function (name, nameList) {
	for (var i=0; i<nameList.length; i++) {
		if (name === nameList[i])
			return true;
	}
	return false;
}

// randomizeData = function (array) {
// 	// make a list of randomly arranged indices
// 	var length = array.length;
// 	var indexList = [];
// 	for (var i=0; i<length; i++) {
// 		var index;
// 		// the newly generated random index
// 		// cannot be already in indexList
// 		do {
// 			index = Math.random()*(length-1);
// 			index = Math.floor(index);
// 		} while (isExist(index, indexList)

// 		indexList.push(index);
// 	}
// 	var randomArray = [];
// 	//make new array according to the random indices
// 	for (var i=0; i<length; i++) {
// 		var randomIndex = indexList[i];
// 		randomArray.push(array[randomIndex]);
// 	}
// 	console.log("randomArray: " + randomArray);
// 	return randomArray;
// }