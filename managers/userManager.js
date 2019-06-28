const express = require('express');
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create a router for this manager
var router = express.Router();

// Mongoose schema for user
mongoose.connect('mongodb://localhost:27017/city');

// Creation on schema
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: Number,
  Money: Number,
});

// Create table + model
var User = mongoose.model('User', UserSchema, 'user');
module.exports = User;

var url = 'mongodb://localhost:27017/';

// Export this router so the server entry point can call it
module.exports = router;

// use :name to specify id in the path param
router.get('/user/:name', (request, response) => {
  mongo.connect(url, function(err, client) {
    if (err) throw err;

    // the :name can be retrieved by calling request.params.name
    var query = { name: request.params.name };

    // In this mongo version function db and close has been moved to function client
    var db = client.db('city');
    db.collection('city')
      .find(query)
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        response.send(result);
        client.close();
      });
  });
});

// Function to create user
// Need to use bodyParser.json() to tell this endpoint to accept Json post request
router.post('/user/create', bodyParser.json(), function(req, res) {
  console.log('Creating user');
  console.log('Connection Successful!');
  // Check req.body necessary fields
  if (req.body.email && req.body.username && req.body.password) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    console.log('Start creating');
    //use schema.create to insert data into the db
    User.update(userData, function(err, user) {
      console.log('Inserting');
      if (err) {
        console.log(err);
        return next(err);
      } else {
        return res.send('done');
      }
    });
  }
});
