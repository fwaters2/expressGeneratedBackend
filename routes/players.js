const express = require("express");
const router = express.Router();
const Player = require("../models/player");

router.get("/", (req, res, next) => {
  Player.find()
    .then((data) => res.json(data))
    .catch(() => console.log("catchnex"));
});

router.post("/", (req, res, next) => {
  if (req.body) {
    Player.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Yo, the input field is empty",
    });
  }
});

router.delete("/:id", (req, res, next) => {
  const playerId = req.params.id;
  Player.findByIdAndDelete(playerId)
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
