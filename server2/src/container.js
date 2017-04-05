import {Container} from 'js-data';
import {MongoDBAdapter} from 'js-data-mongodb';

const container = new Container();

const adapter = new MongoDBAdapter({
  debug: true,
  uri: 'mongodb://localhost:32768'
});
container.registerAdapter('mongodb', adapter, {default: true});

export default container;