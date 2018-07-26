var express = require('express');
var router = express.Router();

const TypeService=require('../Service/TypeService');
const DocumentService=require('../Service/DocumentService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//扬子云官网获取文章类型列表

router.get('/type/list',function(req, res, next){
  TypeService.list(req.query,function(data){
    // res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Methods","GET");
    return res.json(data);
  });
});



//获取文章列表

router.get('/document/list',function(req, res, next){
  req.query.queryConf.draft=false;
  DocumentService.list(req,function(data){
    // res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Methods","GET");
    return res.json(data);
  });
});


//查看某一篇文章

router.get('/document/view',function(req, res, next){
  DocumentService.search(req.query,function(data){
    // res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Methods","GET");
    return res.json(data);
  });
});





module.exports = router;
