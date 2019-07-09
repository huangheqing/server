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
  money: Number,
  career: {
    careerKind: String,
    level: Number,
  },
  bag: [
    {
      itemName: String,
      amount: Number,
    },
  ],
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
        money: 100,
      };
      UserStats.create(newUser);
      res.send(
        util.format(
          'user_name: %s, money: %s ',
          newUser.username,
          newUser.money
        )
      );
    } else {
      console.log(user);
      res.send(
        util.format('user_name: %s, money: %s ', user.username, user.money)
      );
    }
  });
});

router.get('/stats/career', (req, res) => {
  UserStats.findOne({ username: req.session.user.username }, function(
    err,
    user
  ) {
    if (err || user == null) {
      res.send(null);
    } else {
      console.log(user);
      res.send(user);
    }
  });
});

router.put('/stats', (req, res) => {
  UserStats.update(
    query,
    {
      $set: {
        username: req.session.user.username,
        career: {
          careerKind: req.body.careerKind,
          level: req.body.level,
        },
      },
    },
    options,
    callback
  );
});
