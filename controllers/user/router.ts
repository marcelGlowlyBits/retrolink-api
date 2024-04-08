import {Router} from 'express';
const controller = require('./userController');

export const user = (router: Router) => {
  router.get('/user/me', controller.me)
};