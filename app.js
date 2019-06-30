const express = require('express');
const app = express();
const port = 3000;

// Register the user router into server
var users = require('./managers/userManager');
app.use(users);
app.set('view engine', 'jade');

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
