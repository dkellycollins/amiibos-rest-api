import {InversifyExpressServer} from 'inversify-express-utils';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import container from './container';
import {Config} from './config';
import {namespace} from './cls';
import * as clsify from 'cls-middleware';

export const SERVER = new InversifyExpressServer(container);
SERVER.setConfig((app) => {
  app.set('environment', Config.server.env);

  app.use(clsify(namespace));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use('/docs', express.static(path.join(__dirname, 'docs')));
});

export const APP = SERVER.build();