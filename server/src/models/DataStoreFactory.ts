import {interfaces} from 'inversify';
import {Container} from 'js-data';
import {MongoDBAdapter} from 'js-data-mongodb';
import {registerAmiiboModel} from './Amiibo';
import {registerAmiiboSeriesModel} from './AmiiboSeries';
import {TYPES} from '../types';
import {IConfig} from '../config';

/**
 * 
 * @param context 
 */
export function dataStoreFactory(context: interfaces.Context): Container {
  const config = context.container.get<IConfig>(TYPES.Config);

  const container = new Container();

  const adapter = new MongoDBAdapter(config.mongo);
  container.registerAdapter('mongodb', adapter, {default: true});

  registerAmiiboModel(container);
  registerAmiiboSeriesModel(container);

  return container;
}

/**
 * 
 * @param modelName 
 * @param context 
 */
export function modelFactory(modelName: string, context: interfaces.Context): any {
  const dataStore = context.container.get<any>(TYPES.Models.DataStore);
  return dataStore.as(modelName);
}