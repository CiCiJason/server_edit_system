var mongoose = require('../conf/db');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
    //文档类型
    type: String,
    //主标题
    title: String,
    //副标题
    subtitle: String,
    //文章正文
    content: String,
    //是否是草稿
    draft:{
        type:Boolean,
        default:true
    },
    //是否置顶
    top:{
        type:Boolean,
        default:false
    },
    //阅读量
    count:{
        type:Number,
        default:0
    },
    //发布时间
    time: {
        type: Date,
        default: Date.now
    },
    //上一次修改时间
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    //文档录入人
    accountname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = mongoose.model('Document', DocumentSchema);