const _ = require('lodash');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models').User;

passport.use(new BasicStrategy(
  (username, password, callback) => {
    User.findOne({ where: { username } }).then((user) => {
      if (_.isEmpty(user)) {
        return callback(null, false);
      }
      user.verifyPassword(password, (err, isMatch) => {
        if (err || !isMatch) {
          return callback(err);
        }
        if (!isMatch) {
          return callback(null, false);
        }

        // Success
        return callback(null, user);
      });
    }).catch(err => callback(err));
  }
));

module.exports.isAuthenticated = passport.authenticate('basic', { session: false });
