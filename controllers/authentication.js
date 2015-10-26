// Load required packages
var debug = require('debug')('server:controller:authentication');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(

  function(username, password, callback) {
    User.findOne({
      username: username
    }, function(error, user) {
      if (error) {
        debug(error);
        return callback(error);
      }

      // No user found with that username
      if (!user) {
        debug('User does not exist');
        return callback(null, false);
      }

      // Make sure the password is correct
      user.verifyPassword(password, function(error, isMatch) {
        if (error) {
          debug(error);
          return callback(error);
        }

        // Password did not match
        if (!isMatch) {
          debug('Passwords do not match, mate.');
          return callback(null, false);
        }

        // Success
        debug('Found user:', user);
        return callback(null, user);
      });
    });
  }
));

module.exports.isAuthenticated = passport.authenticate('basic', {
  session: false
});
