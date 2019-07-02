const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create a router for this manager
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// Mongoose schema for user
mongoose.connect('mongodb://localhost:27017/city');

// Creation on schema
var UserStatsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  exp: Number,
  Money: Number,
});

// Create table + model
var UserStats = mongoose.model('UserStats', UserStatsSchema, 'userStats');
module.exports = UserStats;

// Export this router so the server entry point can call it
module.exports = router;

router.get('/stats/:username', (req, res) => {
  // the :id can be retrieved by calling request.params.username
  UserStats.find({ username: req.params.username }, function(err, user) {
    console.log('get stats by name');
    if (err) {
      console.log(err);
      return next(err);
    } else {
      UserStats.create({ username: req.params.username });
      res.send(user);
    }
  });
});
