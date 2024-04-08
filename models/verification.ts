import {Schema, model} from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  email: String,
  accessToken: String,
  expiresIn: Date
  }, { timestamps: true });

export const Verification = model('Verification', schema);