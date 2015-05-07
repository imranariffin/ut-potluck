//creatorRoute.js
//var express = require('express');
//var router = express.Router();

var mongoose = require('mongoose');
var schemas = require('../schemas/schemas');

var Vote = mongoose.model('vote', schemas.voteSchema);

exports.create = function (req, res) {
	new Vote ({
		candidate : req.body.content,
		update_at : Date.now()
	}).save( function( err, vote, count) {
		//res.redirect('/');
	});
};