import {User} from '../models/user';

export const userService = {
  create: ({email, password}: {
      email: string
      password: string
    },
  ) =>
    new User({
      email,
      password,
    }).save(),

  isExistByEmail: (email: string) => User.exists({email}),

  getByEmail: (email: string) => User.findOne({ email }),
}