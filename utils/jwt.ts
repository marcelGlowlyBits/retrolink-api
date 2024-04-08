import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongoose';

interface IJwtUser {
  id: ObjectId
};

interface IAccessToken {
  accessToken: string
};

export const jwtSign = (id: ObjectId): IAccessToken => {
  const accessToken = jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRATION
  })

  return { accessToken }
}

export const jwtVerify = ({ accessToken }: { accessToken: string }) => {
  return jwt.verify(accessToken, `${process.env.JWT_SECRET}`) as unknown as IJwtUser
}