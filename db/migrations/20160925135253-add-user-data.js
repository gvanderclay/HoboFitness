module.exports = {
  up(queryInterface, Sequelize) {
    // Add age property to Users
    queryInterface.addColumn('Users', 'dateOfBirth', {
      type: Sequelize.DATEONLY,
    });

    // Add weight property to Users
    queryInterface.addColumn('Users', 'weight', {
      // Storing weight as lbs
      type: Sequelize.FLOAT,
    });

    // Add height property to Users
    queryInterface.addColumn('Users', 'height', {
      // Storing height as inches
      type: Sequelize.FLOAT,
    });
  },

  down(queryInterface) {
    queryInterface.dropColumn('Users', 'age');
    queryInterface.dropColumn('Users', 'weight');
    queryInterface.dropColumn('Users', 'height');
  },
};
