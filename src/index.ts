import 'babel-core/register';
import 'babel-polyfill';
import {APP} from './server';
import {Config} from './config';
import container from './container';
import {TYPES} from './types';
import {Sequelize} from 'sequelize';
import {Umzug} from 'umzug';

console.log('Updating database...');
const umzug = container.get<Umzug>(TYPES.Models.Migrator);
umzug.up()
  .then(() => {
    APP.listen(Config.server.port);
    console.log(`Server started on port ${Config.server.port} :)`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });