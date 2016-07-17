var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var routes = require('./routes');
var config = require('./config');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/react-weather');

// Index Route
app.get('/', routes.index);

// Get initial state
app.get('/state/:id', routes.state);

// Get weather by zip
app.get('/zip/:zip', routes.zip);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
  	console.log('Express server listening on port ' + port);
});