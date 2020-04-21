const express = require("express");
const router = express.Router();
const Player = require("../models/player");
const Stat = require("../models/stat");

router.get("/", (req, res, next) => {
  function sortByStat(a, b) {
    if (a.stats > b.stats) {
      return -1;
    }
    if (a.stats < b.stats) {
      return 1;
    } else {
      return 0;
    }
  }
  Player.find()
    .then((players) => {
      Promise.all(
        players.map(async (player) => {
          const count = await Stat.countDocuments({ playerId: player._id });
          let leaderboardEntry = {
            name: player.name,
            stats: count,
            playerId: player._id,
          };
          return leaderboardEntry;
        })
      ).then((leaderboard) => res.json(leaderboard.sort(sortByStat)));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
