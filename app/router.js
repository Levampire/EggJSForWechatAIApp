'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/chat',controller.home.chat);
  router.get('/translation',controller.home.translation);
  router.post('/char',controller.home.char);

};
