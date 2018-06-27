var User = require("./models/User.js");
var bcrypt = require('bcrypt');


function InsertUser(data, callback) {

    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
            // Store hash in your password DB.
            var userInsert = new User({ accountname: data.accountname, email: data.email, password: hash });
            userInsert.save().then(function(result) {
                callback(result);
            });
        });
    });
}

//插入新用户信息
const createNewUser =(data)=>{
    bcrypt.genSalt(12,(err,salt)=>{
        bcrypt.hash(data.password,salt,(err,hash)=>{
            const newUser=new User({accountname:data.accountname,password:hash});
        })
    })
}



//注册
exports.SignUp = function(data, type, callback) {
    if (type == "accountname") {
        User.findOne({ accountname: data.accountname }).then(function(finddata) {
            if (finddata) {
                return callback(false, "用户名已经被注册");
            } else {
                return callback(true, "用户名可以注册");
            }
        });
    }
    if (type == "email") {
        User.findOne({ email: data.email }).then(function(finddata) {
            if (finddata) {
                return callback(false, "邮箱已经被注册");
            } else {
                return callback(true, "用户名可以注册");
            }
        });
    }
    if (type == "register") {
        User.find({ $or: [{ 'accountname': data.accountname }, { 'email': data.email }] }, function(err, finddata) {
            if (!finddata.length) {
                InsertUser(data, function(result) {
                    return callback(true, "注册成功");
                });
            } else {
                return callback(false, "用户名或者邮箱已经被注册");
            }
        });
    }
}

//登录
exports.SignIn = function(data, callback) {

    User.findOne({ accountname: data.accountname }).then(function(finddata) {
        if (finddata) {
            var password = data.password ? data.password : data.oldpassword;
            var hash = finddata._doc.password;
            var id = finddata._id;
            bcrypt.compare(password, hash, function(err, res) {
                if (res == true) {
                    return callback(true, "登录成功", id);
                } else {
                    return callback(false, "密码错误", null);
                }
            });
        } else {
            return callback(false, "用户名不存在", null);
        }

    });
}

exports.getById = function(data, callback) {

    User.findById({ _id: data }).then(function(result) {
        callback(true, result._doc);
    });

}

//通过ID更改
exports.updateById = function(id, data, callback) {

    User.update({ _id: id }, {
        accountname: data.accountname,
        username: data.username,
        email: data.email,
        tel: data.tel
    }).then(function(data) {
        callback(true, "修改成功");
    }, function(err, data) {
        callback(false, "修改失败");
    });

}

//一般更改
exports.update = function(accountname, newpassword, callback) {

    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(newpassword, salt, function(err, hash) {
            // Store hash in your password DB.
            User.update({ accountname: accountname }, {
                password: hash
            }).then(function(data) {
                callback(true, "修改成功");
            }, function(err, data) {
                callback(false, "修改失败");
            });

        });
    });

}





//创建新的用户（注册新用户）



//用户登录


//删除已经存在的用户
//如果用户已经被删除，该文档继续保存



//更新用户信息（用户名，密码之类信息）

