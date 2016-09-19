const router = require('express').Router();

module.exports = () => {
  /* GET home page. */
  router.get('/', (req, res, next) => {
    res.send('HELLO');
    next();
  });

  return router;
};
