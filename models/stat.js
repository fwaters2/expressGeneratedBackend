const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema for players

const StatSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  },
  { timestamps: true }
);

//create model for player
const Stat = mongoose.model("Stat", StatSchema);

module.exports = Stat;
