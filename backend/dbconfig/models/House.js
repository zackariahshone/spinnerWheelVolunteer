const { Schema, model } = require('mongoose');

 const HouseSchema = new Schema({
  HouseName: {
    type: String,
  },
  Videos: Schema.Types.Mixed
});

const Houses = model('House', HouseSchema);
module.exports = Houses;