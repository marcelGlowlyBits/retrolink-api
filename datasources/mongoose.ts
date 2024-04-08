import {connect, connection} from 'mongoose';
import {config} from 'dotenv';

config();
const uri = process.env.MONGODB_URI;

export const mongoose = {
  run: async () => {
    try {
      console.log('Db connection started');
      return await connect(uri)

    } catch (error) {
      console.log('error', error)
    }
  },

  stop: async () => {
    try {
      return await connection.destroy()
    } catch (error) {
      console.log('error', error)
    }
  }
}