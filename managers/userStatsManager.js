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
        util.format(
          'user_name: %s, money: %s , bag: %s, career: %s',
          user.username,
          user.money,
          user.bag,
          user.career
        )
      );
    }
  });
});

router.get('/stats/career', (req, res) => {
  UserStats.findOne({ username: req.session.user.username }, function(
    err,
    user
  ) {
    if (err || user == null || user.career == '{}') {
      console.log('career is null or empty for ' + username);
      res.send({});
    } else {
      console.log(user.career);
      res.send(user.career);
    }
  });
});

router.put('/stats/career', (req, res) => {
  console.log(req.session.user.username);
  console.log(req.body.careerKind);
  console.log(req.body.level);
  UserStats.findOneAndUpdate(
    { username: req.session.user.username },
    { career: { careerKind: req.body.careerKind, level: req.body.level } },
    { upsert: true, useFindAndModify: false },
    function(err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send('succesfully saved');
    }
  );
});

router.put('/stats/items/add', (req, res) => {
  var itemNeedToUpdate = req.body;
  UserStats.findOne({ username: req.session.user.username }, function(
    err,
    user
  ) {
    var amount = parseInt(itemNeedToUpdate.amount);
    var newBag = [];
    var currBag = user.bag;
    for (var i in currBag) {
      if (currBag[i].itemName == itemNeedToUpdate.itemName) {
        amount += parseInt(currBag[i].amount);
      } else if (currBag[i].itemName != null && currBag[i].amount != null) {
        newBag.push(currBag[i]);
      }
    }
    newBag.push({ itemName: itemNeedToUpdate.itemName, amount: amount });
    console.log(newBag);
    UserStats.findOneAndUpdate(
      {
        username: req.session.user.username,
      },
      {
        bag: newBag,
      },
      { upsert: true, useFindAndModify: false },
      function(err, doc) {
        if (err) return res.status(500).send({ error: err });
        return res.send('succesfully saved');
      }
    );
  });
});
