var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var routes = require('./routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'cici900806',
    name: 'editsystem', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    //cookie: { maxAge: 1000 * 60 * 60 * 24 }, //设置maxAge是1天，即1天后session和相应的cookie失效过期
    cookie: { maxAge: 1000 * 60 * 60 * 24 },//1天之后失效

    resave: false, // 是否每次都重新保存会话，建议false
    saveUninitialized: true, // 是否自动保存未初始化的会话，建议false
    // store: new MongoStore({ //创建新的mongodb数据库
    //     host: '127.0.0.1', //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
    //     port: 27017, //数据库的端口号
    //     url: 'mongodb://127.0.0.1:27017/shihe',
    //     db: 'shihe', //数据库的名称。
    //     cookieSecret: 'shihe',
    //     mongodb: 'mongodb://127.0.0.1:27017/shihe',
    // })
}));

app.use(express.static(path.join(__dirname, 'public')));

routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;