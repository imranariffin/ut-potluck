var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('result', { 
  	title: 'UT Summer Potluck' ,
  	partials: {navbar: 'navbar'}
  });
});

module.exports = router;
