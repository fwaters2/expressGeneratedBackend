const express = require("express");
const router = express.Router();
const Stat = require("../models/stat");

router.get("/", (req, res, next) => {
  Stat.find()
    .populate("playerId", "name")
    .then((newStuff) => res.json(newStuff))

    .catch((err) => console.log("caught an error", err));
});

router.post("/", (req, res, next) => {
  if (req.body) {
    Stat.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Yo, error in stats fields",
    });
  }
});

router.delete("/", (req, res, next) => {
  if (req.body) {
    Stat.findOneAndDelete({
      _id: req.query.id,
    })
      .then((data) => res.json(data))
      .catch("trying to next", next);
  } else {
    res.json({
      error: "Yo, error in deletion",
    });
  }
});

module.exports = router;
