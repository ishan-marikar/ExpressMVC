var express = require('express');

var energyDrinkController = require('../controllers/energy-drink');
var userController = require('../controllers/user');
var authenticationController = require('../controllers/authentication');

var router = express.Router();

router.route('/energy-drink')
  .get(authenticationController.isAuthenticated, energyDrinkController.getDrink)
  .post(energyDrinkController.postDrinks);

router.route('/energy-drink/:id')
  .get(energyDrinkController.getDrink)
  .put(authenticationController.isAuthenticated, energyDrinkController.putDrink)
  .delete(authenticationController.isAuthenticated, energyDrinkController.deleteDrink);

router.route('/users')
  .post(userController.postUser)
  .get(authenticationController.isAuthenticated, userController.getUsers);

module.exports = router;
