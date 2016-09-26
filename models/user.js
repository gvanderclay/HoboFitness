const bcrypt = require('bcrypt-nodejs');
const Routine = require('./index').Routine;

const SALT_WORK_FACTOR = 10;

/**
 * User: A user of the app
 *  username: username for the user
 *    Required
 *  email: email for the user
 *    Not Required
 *  firstname: First name of the user
 *    Required
 *  lastname: Last name of the user
 *    Not Required
 *  password: password for the user
 *    gets hashed using bcrypt before being submitted.
 *    Required
 *  createdAt: date the suser was created
 *  age: age of the user
 *    Not Required
 *  weight: weight of the user
 *    Not Required
 *  height: height of the user
 *    Not Required
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Routine, {
          foreignKey: {
            allowNull: false,
          },
        });
      },
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
