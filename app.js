const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 3000;

// Mongoose schema for user
mongoose.connect('mongodb://localhost:27017/city');

var sessionMiddleWare = session({
  key: 'user_sid',
  secret: 'work hard',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 6000000000 },
});

var users = require('./managers/userManager');
var userStats = require('./managers/userStatsManager');
var items = require('./managers/itemsManager');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.use(sessionMiddleWare);
app.use(cookieParser());
// Register the routes into server
app.use(users);
app.use(userStats);
app.use(items);

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
