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
    createTime: {
        type: Date,
        default: Date.now
    },
    lastLoginTime: {
        type: Date,
        default: Date.now
    },
    count:{
        type:Number,
        default:0
    }


    // body: String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }

});

module.exports = mongoose.model('User', UserSchema);