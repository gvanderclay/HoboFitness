module.exports = (sequelize, DataTypes) => {
  /**
   * Routine: Routine a user can do. A routine will be composed of different workouts that the user
   * does in sequence. For example, a user could have a routine with workout a and workout b. If
   * they choose to do this routine, they will be doing workout a and workout b.
   *  Name: name of the routine
   */
  const Routine = sequelize.define('Routine', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
    },
  });


  return Routine;
};
