import {Container} from 'js-data';
import {MongoDBAdapter} from 'js-data-mongodb';
import amiiboModelFactory from './amiibo.model';
import amiiboSeriesModelFactory from './amiiboSeries.model';
import collectionModelFactory from './collection.model';

const container = new Container();

const adapter = new MongoDBAdapter({
  debug: true,
  uri: 'mongodb://localhost:32769'
});
container.registerAdapter('mongodb', adapter, {default: true});

export const amiiboModel = amiiboModelFactory(container);
export const amiiboSeriesModel = amiiboSeriesModelFactory(container);
export const collectionModel = collectionModelFactory(container);