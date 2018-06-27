var mongoose = require('../conf/db');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    //账号名
    accountname: String,
    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员
    isAdmin: {
        type: Boolean,
        default: false
    },
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //上次登录时间
    lastLoginTime: {
        type: Date,
        default: Date.now
    },
    //浏览次数
    count:{
        type:Number,
        default:0
    }

});

module.exports = mongoose.model('User', UserSchema);