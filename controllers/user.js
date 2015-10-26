var debug = require('debug')('server:user:controller');
var User = require('../models/user');


module.exports = {

  postUser: function(request, response) {
    debug("POST /user")
    var user = new User({
      username: request.body.username,
      password: request.body.password
    });

    user.save(function(error) {
      if (error) {
        debug(error);
        response.send(error);
      }

      response.json({
        message: 'New user has been added '
      });

    });
  },

  getUsers: function(request, response) {
    debug("GET /users");
    User.find(function(error, users) {
      if (error) {
        debug(error);
        response.send(error);
      }
      response.json(users);
    });
  }


};
