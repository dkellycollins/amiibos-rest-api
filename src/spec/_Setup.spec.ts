import 'babel-core/register';
import 'babel-polyfill';
import {Sequelize} from 'sequelize';
import container from '../container';
import {namespace} from '../cls';
import {TYPES} from '../types';
import {Config} from '../config';

beforeEach(setupDB);

async function setupDB() {
  const sql = container.get<Sequelize>(TYPES.Models.DataStore);
  await sql.drop();
  await sql.sync({force: true});
}