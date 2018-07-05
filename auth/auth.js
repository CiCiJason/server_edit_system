var UserService = require('../Service/User/UserService');

//var logger = require('./loghelper').helper;

module.exports = function(req, res, next) {
    if (req.url.indexOf('/login') > -1 || req.url === '/' || req.url.indexOf('/api') > -1) {
        next();
    } else {

        if(req.session.signed){
            next();
        }else{
            return {}
        }
        
    }
};