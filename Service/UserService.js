var User = require("../models/User.js");
// var bcrypt = require('bcrypt-nodejs');
// const saltRounds = 10;
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
            var newUser=new User({accountname: data.accountname, password: md5(data.password) });
            newUser.save(function(err1,user){
                if(err1){
                    callback({code:'100',msg:err1});
                }else{
                    callback({ code: '0', msg: '注册成功' });
                }
            });
        }
    })
}


//编辑更改类型名称

exports.SignIn = (req, callback) => {
    const data = req.body;
    User.findOne({ accountname: data.accountname }, (err, user) => {
        // if (err) { errfun(err) }
        if(err){
            callback({code:'100',msg:err});
        }else{
            if (user) {
                if(data.password==user.password){
                    callback({ code: '0', msg: '登录验证成功', _id: user.id, accountname: user.accountname, logined: true, admin: user.isAdmin })
                }else{
                    callback({ code: '2', msg: '用户名或密码不正确' })
                }
            } else {
                callback({ code: '2', msg: '用户名或密码不正确' })
            }
        }
    });
}


//获取除admin之外的所有用户列表

exports.list = (data, callback) => {
    User.find({}, 'accountname createTime lastLoginTime isAdmin', function (err, users) {
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

    User.findByIdAndUpdate(data._id,{password:md5('123456')},function(err,user){
        if(err){
            callback({code:'100',msg:err});
        }else{
            if(user){
                callback({ code: '0', msg: '重置成功' });
            }else{
                callback({ code: '1', msg: '重置失败' });
            }
        }
    })
}


//用户修改密码

exports.repassword = (req, callback) => {
    const data = req.body;
    User.findById(req.session._id, (err, user) => {
        if(err){
            callback({code:'100',msg:err1});
        }else{
            if(user){
                if(data.password==user.password){
                    user.update({ password: data.newpassword }, (err1, newPwd) => {
                        if(err1){
                            callback({ code: '100', msg: err1 });
                        }else{
                            callback({ code: '0', msg: '修改成功' });
                        }
                    });
                }else{
                    callback({ code: '2', msg: '原密码不正确' });
                }

            }else{
                callback({ code: '1', msg: '账户不正确' });
            }
        }
    });
}


//设置为管理员

exports.setAdmin=(data,callback)=>{
    User.findByIdAndUpdate(data._id,{isAdmin:true},function(err,user){
        if(err){
            callback({code:'100',msg:err});
        }else{
            if(user){
                callback({ code: '0', msg: '设置成功' });
            }else{
                callback({ code: '1', msg: '设置失败' });
            }
        }
    })
}

//取消管理员身份

exports.cancelAdmin=(data,callback)=>{
    User.findByIdAndUpdate(data._id,{isAdmin:false},function(err,user){
        if(err){
            callback({code:'100',msg:err});
        }else{
            if(user){
                callback({ code: '0', msg: '设置成功' });
            }else{
                callback({ code: '1', msg: '设置失败' });
            }
        }
    })
}
