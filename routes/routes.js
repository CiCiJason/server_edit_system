var index = require('./index');
var user = require('./user');
var document = require('./document');
var type = require('./type');
var api = require('../api/api.js');


module.exports = function(app) {
    app.use('/', index);
    app.use('/user', user);
    app.use('/document', document);
    app.use('/type', type);
    app.use('/api', api);
}