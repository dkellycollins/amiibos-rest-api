import * as express from 'express';
import amiiboController from './amiibos/amiibo.controller';

const server = express();

server.use('/amiibos', amiiboController);

server.listen(3000, function() {
  console.log('Listening on port 3000');
});