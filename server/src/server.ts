import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import container from './container';
import {Config} from './config';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.set('environment', Config.server.env);
});

const app = server.build();
app.listen(Config.server.port);
console.log(`Server started on port ${Config.server.port} :)`);