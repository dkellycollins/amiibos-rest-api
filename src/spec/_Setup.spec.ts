import 'babel-core/register';
import 'babel-polyfill';
import {Sequelize} from 'sequelize';
import container from '../container';
import {namespace} from '../cls';
import {TYPES} from '../types';
import {Config} from '../config';

before(setupDB);
beforeEach(setupTransaction);
afterEach(rollbackTransaction);

async function setupDB() {
  const sql = container.get<Sequelize>(TYPES.Models.DataStore);
  await sql.drop();
  await sql.sync({force: true});
}

async function setupTransaction() {
  const sql = container.get<Sequelize>(TYPES.Models.DataStore);
  const transaction = await sql.transaction();
  namespace.set('transaction', transaction);
}

function rollbackTransaction() {
  const transaction = namespace.get('transaction');
  transaction.rollback();
  namespace.set('transaction', null);
}