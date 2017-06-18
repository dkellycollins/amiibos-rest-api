import 'babel-core/register';
import 'babel-polyfill';
import {APP} from './server';
import {Config} from './config';
import container from './container';
import {TYPES} from './types';
import {Sequelize} from 'sequelize';

//TODO: Handle this through migrations.
console.log('Updating database...');
const db = container.get<Sequelize>(TYPES.Models.DataStore);
db.sync({
    force: true
  })
  .then(() => {
    APP.listen(Config.server.port);
    console.log(`Server started on port ${Config.server.port} :)`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });