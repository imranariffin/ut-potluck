var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UT Summer Potluck' });
  res.send(200);
  //{username: "imran", password: "pass"}
});

module.exports = router;
