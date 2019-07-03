const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Register the user router into server
var users = require('./managers/userManager');

app.set('view engine', 'jade');
app.use(users);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
