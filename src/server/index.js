import express from 'express';
// import dotenv from 'dotenv';
import Knex from 'knex';
import { Model } from 'objection';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import config from './config';

const knex = Knex(config.database);
Model.knex(knex);

const app = express();
app.use(helmet());
app.use(logger('tiny'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('dist', { maxAge: '1y' }));

app.get('*', (req, res) => {
  res.sendStatus(200);
});

const port = config.port || '9001';

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});