var express = require('express');
var router = express.Router();
const UserService=require('../Service/UserService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//用户登录
router.post('/login',function (req,res,next) {
  UserService.SignIn(req.body,function(data){
    return res.json(data);
  });
});

//用户注册
router.post('/register',function (req,res,next) {
  UserService.SignUp(req.body,function (data) {
    return res.json(data);
  });
});

//获取除admin之后的，所有用户列表
router.get('/list',function (req,res,next) {
  UserService.list(req.query,function(data){
    return res.json(data);
  });
});

module.exports = router;
