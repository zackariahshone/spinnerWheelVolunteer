const { Schema, model } = require('mongoose');

 const HouseSchema = new Schema({
  HouseName: {
    type: String,
  },
  Videos:String
});

const Houses = model('House', HouseSchema);
module.exports = Houses;