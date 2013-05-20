
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  // look for a file called node.js
  , nodes = require('./routes/nodes')
  , http = require('http')
  , path = require('path')
  , config = require('./config');

var app = express();

// all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// switching out handlebars for jade
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/nodes', function getNodes(req, res, next) {
  nodes('http://anise.nodejs.4kclass.com/exercises/drupal/rest/node.json', function renderNodes(err, nodes) {
    console.log(nodes);
    if (err) return next( err);
    res.render('nodes', { results: nodes });
  });
});

app.post('/ping', function postPing(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
