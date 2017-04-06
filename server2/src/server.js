import express from 'express';
import * as bodyParser from 'body-parser';
import amiiboController from './controllers/amiibo.controller';

const server = express();

server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json())

server.use('/amiibos', amiiboController);

server.use(function (err, req, res, next) {
  if (!!err) {
    console.error('Error:', err);
    res.status(500).send(err.toString());
  }
  else {
    //No endpoint was hit.
    res.send(404);
  }
});

server.listen(3000, function() {
  console.log('Listening on port 3000');
});