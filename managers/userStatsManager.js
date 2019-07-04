const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const util = require('util');

// Create a router for this manager
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// Creation on schema
var UserStatsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  exp: Number,
  money: Number,
});

// Create table + model
var UserStats = mongoose.model('UserStats', UserStatsSchema, 'userStats');
module.exports = UserStats;

// Export this router so the server entry point can call it
module.exports = router;

// This endpoint is for getting your own user stats data,
// Rely on the session data to retrieve current logged in user
router.get('/stats', (req, res) => {
  UserStats.findOne({ username: req.session.user.username }, function(
    err,
    user
  ) {
    console.log('get stats by id');
    if (err || user == null) {
      console.log(err);
      var newUser = {
        username: req.session.user.username,
        exp: 0,
        money: 100,
      };
      UserStats.create(newUser);
      res.send(
        util.format('user name: %s money: %s ', newUser.username, newUser.money)
      );
    } else {
      console.log(user);
      res.send(
        util.format('user name: %s money: %s ', user.username, user.money)
      );
    }
  });
});
