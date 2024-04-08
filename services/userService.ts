import {ClientSession, ObjectId, Schema} from 'mongoose';

import {User} from '../models/user';

export const userService = {
  create: ({email, password, verified = false}: {
      email: string
      password: string
      verified?: boolean
    },
    session?: ClientSession
  ) =>
    new User({
      email,
      password,
      verified
    }).save({ session }),

  isExistByEmail: (email: string) => User.exists({email}),

  
  addVerificationToUser: async ({userId, verificationId}: {
    userId: ObjectId
    verificationId: Schema.Types.ObjectId
  }, session?: ClientSession) => {

    let options = {};

    if (session) { options = {session} }

    const user = await User.findOne({ _id: userId }, null, options);

    if (user) {
      if (!user.verifications) {
        user.verifications = []
      }

      // @ts-ignore
      user.verifications.push(verificationId)
      await user.save({ session })
    }
  },

  getByEmail: (email: string) => User.findOne({ email }),
}