const User = require('../models').User;
const router = require('express').Router();

module.exports = (auth) => {
  /* GET users listing.*/
  router.get('/', auth, (req, res) => {
    User.findAll({}).then((users) => {
      res.json(users);
    });
  });

  router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    }).then(() => {
      res.send('User created successfully');
    }).catch((err) => {
      res.status(400).json(err.errors);
    });
  });

  return router;
};
