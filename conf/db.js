var mongoose = require('mongoose');
var setting = require('./setting');

/**
 * 连接
 */
mongoose.connect(setting.mongodb);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + setting.mongodb);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;