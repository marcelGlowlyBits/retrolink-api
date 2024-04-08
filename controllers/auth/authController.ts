import {Response} from 'express';
import {startSession} from 'mongoose';

import {userService, verificationService} from '../../services';
import {createHash} from '../../utils/hash';
import {createCryptoString} from '../../utils/cryptoString';
import {createDateAddDaysFromNow} from '../../utils/dates';
import {ExpiresInDays} from '../../constants';
import {jwtSign} from '../../utils/jwt';

import {SignInPayload, SignUpPayload} from '../../types/auth';

interface IBodyRequest<T> extends Omit<Request, 'body'> {
  body: T
}

module.exports = {
  async signIn(req: IBodyRequest<SignInPayload>, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Bad request',
        status: 400
      })
    }

    try {
      const user = await userService.getByEmail(email);
      const comparePassword = user && user.comparePassword(password);
      
      if (!user || !comparePassword) {
        return res.status(404).json({
          message: 'Not found',
          status: 404
        })
      }

      const {accessToken} = jwtSign(user.id);

      return res.status(200).json({
        data: {accessToken},
        message: 'User successfully logged in',
        status: 'success'
      })

    } catch (error) {
      return res.status(400).json({
        message: 'Bad request',
        status: 400
      })
    }
  },

  async signUp(req: IBodyRequest<SignUpPayload>, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Bad request',
        status: 400
      })
    }

    const session = await startSession();

    try { 
      const isUserExist = await userService.isExistByEmail(email);

      if (isUserExist) {
        return res.status(400).send('User already exists');
      }

      session.startTransaction();
      const hashedPassword = await createHash(password);

      const user = await userService.create({ email, password: hashedPassword }, session);

      const cryptoString = createCryptoString();
      const dateFromNow = createDateAddDaysFromNow(ExpiresInDays.Verification);

      const verification = await verificationService.create({
        userId: user.id,
        email,
        accessToken: cryptoString,
        expiresIn: dateFromNow
      }, session);

      await userService.addVerificationToUser({
        userId: user.id,
        verificationId: verification.id
      }, session);

      const {accessToken} = jwtSign(user.id);

      await session.commitTransaction()
      session.endSession()

      return res.status(200).json({
        data: {accessToken},
        message: 'User successfully created',
        status: 'success'
      })
    
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction()
        session.endSession()
      }

      return res.status(500).json({
        message: 'bad request',
        status: 'error'
      })
    }
  }
  }

