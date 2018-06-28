var express = require('express');
var router = express.Router();
const TypeService=require('../Service/TypeService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//获取除admin之后的，所有用户列表
router.get('/list',function (req,res,next) {
  TypeService.list(req.query,function(data){
    return res.json(data);
  });
});

//添加新的类型
router.post('/add',function (req,res,next) {
  TypeService.create(req.body,function (data) {
    return res.json(data);
  })
});

//编辑类型名称
router.put('/edit',function (req,res,next) {
  TypeService.update(req.body,function (data) {
    return res.json(data);
  });
});

//删除类型
router.delete('/delete',function (req,res,next) {
  TypeService.delete(req.query,function (data) {
    return res.json(data);
  })
});


module.exports = router;