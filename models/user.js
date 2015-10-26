var debug = require('debug')('server:user:model');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {

    if (error) {
      debug(error);
      return callback(error);
    }
    debug('Password matches.');
    callback(null, isMatch);

  });
};

// Execute before the user.save() is called
UserSchema.pre('save', function(callback) {
  var user = this;

  // leave if the password hasn't been changed
  if (!user.isModified('password')) return callback();

  // password has changed, so we need to hash it
  bcrypt.genSalt(5, function(error, salt) {
    if (error) {
      debug('Error generating salt');
      return callback(error);
    }

    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if (error) {
        debug('Error hashing password');
        return callback(error);
      }
      debug('Password hashed.');
      user.password = hash;
      callback();
    });

  });
});


module.exports = mongoose.model('User', UserSchema);
