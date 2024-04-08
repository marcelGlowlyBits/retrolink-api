import {Request, Response} from 'express';

module.exports = {
  checkHealth: async (
    req: Request,
    res: Response
  ) => {
    return res.status(200).json({
      message: 'Server is up and running',
      status: 200
    })
  }
}