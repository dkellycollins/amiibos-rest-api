import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import container from './container';
import {Config} from './config';

export const SERVER = buildServer();
export const APP = SERVER.build();

function buildServer() {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    app.set('environment', Config.server.env);
  });

  return server;
}