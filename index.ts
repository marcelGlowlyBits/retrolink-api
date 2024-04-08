import express from "express";
import bodyParser from "body-parser";
import {mongoose} from './datasources/mongoose';
require('dotenv').config();

import { router } from './routes';

const port = 3000;
const app = express();

mongoose.run();

app
  .use(express.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
