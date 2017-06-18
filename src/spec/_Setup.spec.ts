import 'babel-core/register';
import 'babel-polyfill';
import {Sequelize} from 'sequelize';
import container from '../container';
import {TYPES} from '../types';
import {MongoClient} from 'mongodb';
import {RedisClient} from 'redis';
import {Config} from '../config';

beforeEach(async () => {
  const sql = container.get<Sequelize>(TYPES.Models.DataStore);
  await sql.drop();
  await sql.sync({force: true});
});