import 'babel-core/register';
import 'babel-polyfill';
import {MongoClient} from 'mongodb';
import {Config} from '../config';

beforeEach(function() {
  return MongoClient.connect(Config.mongo.uri)
    .then((db) => db.dropDatabase());
})