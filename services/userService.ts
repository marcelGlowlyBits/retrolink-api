import {User} from '../models/user';
import { mailerService } from './mailerService';

export const userService = {
  create: ({email, password}: {
      email: string
      password: string
    },
  ) =>
    new User({
      email,
      password,
    }).save().then((user) => {
      mailerService.sendWelcome(user.email);
      return user;
    }),

  isExistByEmail: (email: string) => User.exists({email}),

  getByEmail: (email: string) => User.findOne({ email }),
}