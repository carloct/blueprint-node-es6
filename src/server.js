import dotenv from 'dotenv';
import express from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import config from './config';

dotenv.config();

const knex = Knex(config.db.knex.development);
Model.knex(knex);

const app = express();
app.use(helmet());
app.use(logger('tiny'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('dist', { maxAge: '1y' }));

const port = process.env.EXPRESS_PORT || '9001';

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
