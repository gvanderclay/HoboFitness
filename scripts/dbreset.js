const Umzug = require('umzug');
const models = require('../models');

const sequelize = models.sequelize;
const Sequelize = models.Sequelize;


const umzug = new Umzug({
  logging: console.log,
  migrations: {
    params: [sequelize.getQueryInterface(), Sequelize],
    path: 'db/migrations',
    pattern: /^\d+[\w-]+\.js$/,
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
});

sequelize.getQueryInterface().dropAllTables().then(() => {
  umzug.up();
});
