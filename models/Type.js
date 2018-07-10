var mongoose = require('../conf/db');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
    //类型名称
    typename: String,
    //创建人
    accountname:String,
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //修改人
    editaccountname: String,
    //修改时间
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    status:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('Type', TypeSchema);