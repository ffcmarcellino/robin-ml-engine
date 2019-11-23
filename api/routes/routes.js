'use strict';
module.exports = function(app) {
  const robinApi = require('../controllers/controller');

  // todoList Routes
  app.route('/robin-api/')
    .get(robinApi.prediction)
};
