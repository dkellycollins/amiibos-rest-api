import 'babel-core/register';
import 'babel-polyfill';
import * as Sequelize from 'sequelize';
import container from '../container';
import {TYPES} from '../types';
import {MongoClient} from 'mongodb';
import {RedisClient} from 'redis';
import {Config} from '../config';

before(function() {
  const sql = container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  return sql.sync({
    force: true
  });
})