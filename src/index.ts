import 'reflect-metadata';
import 'babel-core/register';
import 'babel-polyfill';
import * as promiseFinally from 'promise.prototype.finally';
import {APP} from './server';
import {Config} from './config';
import * as Sequelize from 'sequelize';
import {namespace} from './cls';

//Environment Setup
promiseFinally.shim();
Sequelize['useCLS'](namespace);

APP.listen(Config.server.port);
console.log(`Server started on port ${Config.server.port} :)`);
