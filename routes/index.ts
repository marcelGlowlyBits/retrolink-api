import { Router } from 'express'

import {auth} from '../controllers/auth/router';
import {user} from '../controllers/user/router';
import {health} from '../controllers/health/router';

const router: Router = Router()

const routes: {
  [key: string]: (router: Router) => void
} = {auth, user, health}

for (const route in routes) {
  routes[route](router)
}

export { router }