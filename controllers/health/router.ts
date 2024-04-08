import {Router} from 'express';
const controller = require('./healthController');

export const health = (router: Router) => {
  router.get('/health', controller.checkHealth)
};