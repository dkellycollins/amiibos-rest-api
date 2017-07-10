import 'babel-core/register';
import 'babel-polyfill';
import {APP} from './server';
import {Config} from './config';
import container from './container';
import {TYPES} from './types';
import {Sequelize} from 'sequelize';
import * as Umzug from 'umzug';

console.log('Updating database...');
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: container.get<Sequelize>(TYPES.Models.DataStore)
  },
  logging: console.log,
  migrations: {
    path: './src/models/migrations'
  }
});

umzug.up()
  .then(() => {
    APP.listen(Config.server.port);
    console.log(`Server started on port ${Config.server.port} :)`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });