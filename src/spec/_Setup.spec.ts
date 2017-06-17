import 'babel-core/register';
import 'babel-polyfill';
import * as Sequelize from 'sequelize';
import container from '../container';
import {TYPES} from '../types';
import {MongoClient} from 'mongodb';
import {RedisClient} from 'redis';
import {Config} from '../config';

beforeEach(function() {
  const sql = container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  return sql.sync();
})

async function resetMongo() {
  try {
    const db = await MongoClient.connect(Config.mongo.uri);
    await db.dropDatabase();
  }
  catch (err) {
    console.warn(err);
  }
}

function resetRedis() {
  return new Promise((resolve, reject) => {
    const client = new RedisClient(Config.redis);
    client.flushdb((err) => {
      if(!!err) {
        console.warn(err);
      }
      resolve();
    });
  });
} 