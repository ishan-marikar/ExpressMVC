var debug = require('debug')('server:energy-drink:model');
var EnergyDrink = require('../models/energy-drink');

module.exports = {

  postDrinks: function(request, response) {
    debug('POST /drinks');
    var drink = new EnergyDrink();

    drink.name = request.body.name;
    drink.type = request.body.type;
    drink.quantity = request.body.quantity;
    drink.userId = request.user._id;

    debug('Drink name: %s\nDrink type: %s\nDrink quantity: %d', drink.name, drink.type, drink.quantity);

    drink.save(function(error) {

      if (error) {
        debug('Saving drink failed');
        response.send({
          message: error
        });
      }

      debug('Saving drink succeded. Drink added to database.');
      response.json({
        message: 'Drink added'
      });

    });
  },

  getDrinks: function(request, response) {
    debug('GET /drinks');
    EnergyDrink.find(function(error, drinks) {
      debug('Finding drink.');
      if (error)
        debug(error);

      response.json({
        message: error
      });
      response.json(drinks);

    });
  },

  getDrink: function(request, response) {
    debug('GET /drink (note the singular noun)');
    EnergyDrink.find(request.params.id, function(error, drinks) {

      if (error)
        debug(error);

      response.json({
        message: error
      });

      response.json(drinks);

    });
  },

  putDrink: function(request, response) {
    debug('PUT /drink');
    EnergyDrink.findById(request.params.id, function(error, drink) {
      if (error) {
        debug(error);
        response.send(error);
      }

      drink.quantity = request.body.quantity;

      drink.save(function(error) {

        if (error)
          debug(error);
        response.send(error);

        response.json(drink);

      });
    });
  },

  deleteDrink: function(request, response) {
    debug('DELETE /drink');
    EnergyDrink.findByIdAndRemove(request.params.id, function(error) {

      if (error) {
        debug(error);
        response.send(error);
      }

      response.json({
        message: 'Drink removed from locker'
      });

    });
  }
};
