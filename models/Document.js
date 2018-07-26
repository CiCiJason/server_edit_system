var mongoose = require('../conf/db');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
    title: String,
    subtitle: {type:String,default:''},
    content: String,
    coverImg:{type:String,default:''},
    summary:{type:String,default:''},
    typename:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
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
    releaseTime: {
        type: Date,
        default: Date.now
    },
    //创建人
    accountname:String,
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //上次修改人
    lastEditPerson: String,
    //上一次修改时间
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    status:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('Document', DocumentSchema);