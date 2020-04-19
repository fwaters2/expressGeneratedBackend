const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema for players

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: [true, "The player text field is required"],
  },
});

//create model for player
const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
