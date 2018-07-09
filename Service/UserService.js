var User = require("../models/User.js");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const md5 = require('md5');

//返回错误信息

const errfun = (err) => {
    console.log(err);
    return err;
}


//新建类型

exports.SignUp = (data, callback) => {
    User.findOne({ accountname: data.accountname }, (err, user) => {
        if (err) { errfun(err) };
        if (user) {
            //存在，就抛出提示
            callback({ code: '3', msg: '账户名已经注册，请重新输入' });
        } else {
            //密码加密
            bcrypt.hash(data.password, saltRounds, (err, hash) => {
                var newUser = new User({ accountname: data.accountname, password: hash });
                newUser.save(function (err, user) {
                    if (err) { errfun(err) }
                    callback({ code: '0', msg: '注册成功' });
                });
            });
        }
    })
}


//编辑更改类型名称

exports.SignIn = (req, callback) => {
    const data = req.body;
    User.findOne({ accountname: data.accountname }, (err, user) => {
        if (err) { errfun(err) }
        if (user) {
            bcrypt.compare(data.password, user.password, (err, result) => {
                if (err) { errfun(err) }
                if (result) {
                    callback({ code: '0', msg: '登录验证成功', _id: user.id, accountname: user.accountname, logined: true ,admin:user.admin})
                } else {
                    callback({ code: '2', msg: '用户名或密码不正确' })
                }
            })
        } else {
            callback({ code: '2', msg: '用户名或密码不正确' })
        }
    });
}


//获取除admin之外的所有用户列表

exports.list = (data, callback) => {
    User.find({ isAdmin: false }, 'accountname createTime lastLoginTime', function (err, users) {
        if (err) { errfun(err) };
        callback(users);
    })
}


//删除用户

exports.delete = (data, callback) => {
    User.findByIdAndRemove(data._id, function (err, doc) {
        if (err) { errfun(err) }
        if (doc) {
            //doc返回的是查找到的一条需要删除的数据
            callback({ code: '0', msg: '删除成功' });
        } else {
            callback({ code: '1', msg: '删除失败' });
        }
    })
}


//重置密码123456

exports.resetpwd = (data, callback) => {
    bcrypt.hash(md5('123456'), saltRounds, (err, hash) => {
        if (err) { errfun(err) }
        User.findByIdAndUpdate(data._id, { password: hash }, function (err1, user) {
            if (err1) { errfun(err1) }
            if (user) {
                callback({ code: '0', msg: '重置成功' });
            } else {
                callback({ code: '1', msg: '重置失败' });
            }
        });
    });
}


//用户修改密码

exports.repassword = (req, callback) => {
    const data = req.body;
    User.findById(req.session._id, (err1, user) => {
        if (err1) errfun(err1);
        if (user) {
            bcrypt.compare(data.password, user.password, (err2, result) => {
                if (err2) { errfun(err2) }
                if (result) {
                    //密码加密
                    bcrypt.hash(data.newpassword, saltRounds, (err3, hash) => {
                        user.update({ password: hash }, (err4, newPwd) => {
                            callback({ code: '0', msg: '修改成功' });
                        });
                    });
                } else {
                    callback({ code: '2', msg: '原密码不正确' });
                }
            })
        } else {
            callback({ code: '1', msg: '用户名或密码不正确' });
        }
    });
}