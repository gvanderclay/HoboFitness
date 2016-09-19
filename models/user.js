const bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {

    },
    instanceMethods: {
      verifyPassword(password, cb) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
          if (err) cb(err);
          return cb(null, isMatch);
        });
      },
    },
  });
  User.hook('beforeCreate', (user, options, fn) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        user.password = hash;
        return fn(null, user);
      });
    });
  });
  return User;
};
