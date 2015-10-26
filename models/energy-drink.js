var mongoose = require('mongoose');

var EnergyDrinkSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  userId: String
});

module.exports = mongoose.model('EnergyDrink', EnergyDrinkSchema);
