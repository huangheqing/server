const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create a router for this manager
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

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
});

//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Create table + model
var User = mongoose.model('User', UserSchema, 'user');
module.exports = User;

// Export this router so the server entry point can call it
module.exports = router;

router.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

router.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.session);
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

// use :id to specify id in the path param
router.get('/user/:id', (req, res) => {
  if (req.session.username) {
    // the :id can be retrieved by calling request.params.id
    User.findById({ _id: req.params.id }, function(err, user) {
      console.log('get user by id');
      if (err) {
        console.log(err);
        return next(err);
      } else {
        res.send(user);
      }
    });
  } else {
    return res.redirect('/login');
  }
});

// Function to create user
router
  .route('/signup')
  .get(sessionChecker, (req, res) => {
    res.render('signup');
  })
  .post(function(req, res) {
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
      User.create(userData, function(err, user) {
        console.log('Inserting');
        if (err) {
          console.log(err);
          return res.redirect('/signup');
        } else {
          return res.redirect('/login');
        }
      });
    } else {
      console.log('Signup failed');
    }
  });

router
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('login');
  })
  .post(function(req, res) {
    username = req.body.username;
    password = req.body.password;
    console.log('login user: ' + username);
    User.findOne({ username: username }).exec(function(err, user) {
      if (err) {
        return res.send(err);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return res.send(err);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          req.session.user = req.body;
          console.log(req.session);
          console.log('Successfully logged in' + user);
          return res.redirect('/dashboard');
        } else {
          return res.send(
            'Not able to login, Please check your username and password'
          );
        }
      });
    });
  });

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});
