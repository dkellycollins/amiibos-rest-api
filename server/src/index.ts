import 'babel-core/register';
import 'babel-polyfill';
import {APP} from './server';
import {Config} from './config';

APP.listen(Config.server.port);
console.log(`Server started on port ${Config.server.port} :)`);