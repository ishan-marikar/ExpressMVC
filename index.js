// Module imports
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var debug = require('debug')('server:main');

// Routers
var apiRouter = require('./routes/api');

// Configuration file
var configurations = require('./config');
mongoose.connect(configurations.database.mongodb);

// Express Configurations
var app = express();
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', apiRouter);

// .. and we finally listen.
app.listen(configurations.server.port, function() {
  debug('Server listening on port %d', configurations.server.port);
});

// HACK: Temporary - Bug fix for Nodemon
var process = require('process');
process.once('SIGUSR2', function() {
  // Graceful cleanup & shutdown
  process.exit(0); // Exit successfully
});
