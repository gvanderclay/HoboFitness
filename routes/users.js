const express = require('express');
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config/database');
const getToken = require('../lib/token').getToken;

const router = express.Router();

router.post('/new', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass name and password' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});

router.post('/authenticate', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, msg: 'Authentication failed. User not found' });
    } else {
    // check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        console.log(err, isMatch);
        if (isMatch && !err) {
        // if user is found and password is right, creata a toekn
          const token = jwt.encode(user, config.secret);
        // return the information including token as json
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});

router.get('/userinfo', (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ success: false, msg: 'Authentication User not found. ' });
      }
      return res.json({ success: true, user: JSON.stringify(user) });
    });
  } else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

module.exports = router;
