import {InversifyExpressServer} from 'inversify-express-utils';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import container from './container';
import {Config} from './config';
import {namespace} from './cls';
import * as clsify from 'cls-middleware';
import * as passport from 'passport';
import {TYPES} from './types';

export const SERVER = new InversifyExpressServer(container);
SERVER.setConfig((app: express.Application) => {
  const strategies = container.getAll<passport.Strategy>(TYPES.PassportStrategy);
  strategies.forEach((strategy) => {
    console.log(`Using authentication strategy [${strategy.name}].`);
    passport.use(strategy)
  });

  app.set('environment', Config.server.env);

  app.use('/docs', express.static(path.join(__dirname, 'docs')));
  app.use(clsify(namespace));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
});

export const APP = SERVER.build();