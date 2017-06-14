import {InversifyExpressServer} from 'inversify-express-utils';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import container from './container';
import {Config} from './config';

export const SERVER = buildServer();
export const APP = SERVER.build();

function buildServer() {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.set('environment', Config.server.env);

    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    app.use('/docs', express.static(path.join(__dirname, 'docs')));
  });

  return server;
}