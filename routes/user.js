var express = require('express');
var router = express.Router();
const UserService = require('../Service/UserService');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//用户登录
router.post('/login', function (req, res, next) {
  UserService.SignIn(req, function (data) {
    if (data.code == '0') {
      req.session._id = data._id;
      req.session.accountname = data.accountname;
      req.session.logined = data.logined;
    }
    return res.json(data);
  });
});

//用户注册
router.post('/register', function (req, res, next) {
  UserService.SignUp(req.body, function (data) {
    return res.json(data);
  });
});

//获取除admin之后的，所有用户列表
router.get('/list', function (req, res, next) {
  UserService.list(req.query, function (data) {
    return res.json(data);
  });
});

//删除用户
router.delete('/delete', function (req, res, next) {
  UserService.delete(req.query, function (data) {
    return res.json(data);
  })
});

//重置密码
router.put('/resetpwd', function (req, res, next) {
  UserService.resetpwd(req.body, function (data) {
    return res.json(data);
  })
})


//修改密码
router.put('/repassword', function (req, res, next) {
  UserService.repassword(req, function (data) {
    return res.json(data);
  })
})


module.exports = router;