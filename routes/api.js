const express = require("express");
const router = express.Router();
const Player = require("../models/player");

router.get("/players", (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  console.log("hello postman");
  console.log(req.body);
  //res.send("api path");

  Player.find()
    .then((data) => {
      console.log("looking for all /api", "data", data);
      return res.json(data);
    })
    .catch(() => console.log("catchnex"));
});

/* GET stats listing. */
router.get("/stats", (req, res, next) => {
  console.log("in stats");
  res.render("index", { title: "stats are about to be given" });
  //res.send("stats are about to be given");
});

router.post("/players", (req, res, next) => {
  if (req.body) {
    Player.create(req.body)
      .then((data) => {
        //api.insert(res.json(data));
        return res.json(data);
      })
      .catch(next);
  } else {
    res.json({
      error: "Yo, the input field is empty",
    });
  }
});

router.post("/stats", (req, res, next) => {
  if (req.body) {
    Stat.create(req.body)
      .then((data) => {
        //api.insert(res.json(data));
        return res.json(data);
      })
      .catch(next);
  } else {
    res.json({
      error: "Yo, error in stats fields",
    });
  }
});

router.delete("/player", (req, res, next) => {
  Player.findOneAndDelete({
    _id: req.params.id,
  })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
