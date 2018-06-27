var express = require('express');
var router = express.Router();

var TypeOfNews=require('../Service/TypeOfNewsService');

/* GET home page. */
router.post('/create', function(req, res, next) {
  res.render('index', { title: 'Express' });

  TypeOfNews.create();
});

module.exports = router;
