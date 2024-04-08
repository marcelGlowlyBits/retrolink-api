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

  ping: async () => {
    try {
      console.log('Db connection is alive');
      return await connection.db.admin().ping();
    } catch (error) {
      console.error('Could not connect to database', error);
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