'use strict';
module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define('Workout', {
    index: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Workout;
};