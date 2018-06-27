var mongoose = require('../conf/db');
var Schema = mongoose.Schema;

var TypeOfNewsSchema = new Schema({
    //类型名称
    typeName: String,
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //创建人
    accountname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //上次修改时间
    lastEditTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TypeOfNews', TypeOfNewsSchema);