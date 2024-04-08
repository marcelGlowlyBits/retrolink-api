import {Request, Response} from 'express';
import {mongoose} from '../../datasources/mongoose';

module.exports = {
  checkHealth: async (
    req: Request,
    res: Response
  ) => {

   const db = await mongoose.ping();

   if (!db) {
      return res.status(500).json({
        message: 'No active connection to database',
        status: 500
      })
   }

    return res.status(200).json({
      message: 'Server is up and running',
      status: 200
    })
  }
}