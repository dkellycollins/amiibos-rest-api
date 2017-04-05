import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import container from './container';

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');