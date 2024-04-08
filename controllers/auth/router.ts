import { Router } from 'express';
const controller = require('./authController');

export const auth = (router: Router) => {
  router.post('/auth/sign-in', controller.signIn)
  router.post('/auth/sign-up', controller.signUp)
}
