var index = require('./index');
var user = require('./user');
var document = require('./document');
var typeOfNews = require('./typeOfNews');
var api = require('../api/api.js');


module.exports = function(app) {
    app.use('/', index);
    app.use('/user', user);
    app.use('/document', document);
    app.use('/typeOfNews', typeOfNews);
    app.use('/api', api);
}