import 'reflect-metadata';
import * as _ from 'lodash';
import * as promiseFinally from 'promise.prototype.finally';
import {Container, interfaces} from 'inversify';
import {interfaces as expressUtilInterfaces, TYPE} from 'inversify-express-utils';
import {TYPES} from './types';
import {
  NAMES,
  IMessageFactory, 
  AmiibosController,
  AmiiboMessageFactory,
  IAmiiboMessage, 
  AmiiboSeriesController, 
  CollectionsController,
  OkComputerController
} from './controllers';
import {
  IAmiiboManager,
  IAmiiboSeriesManager,
  ICollectionManager,
} from './managers';
import {AmiiboManager} from './managers/impl/AmiiboManager';
import {AmiiboSeriesManager} from './managers/impl/AmiiboSeriesManager';
import {CollectionManager} from './managers/impl/CollectionManager';
import {
  IAmiibo,
  IAmiiboSeries,
  ICollection,
  ICollectionItem
} from './models';
import {dataStoreFactory} from './models/sequelize/DataStoreFactory';
import {amiiboModelFactory} from './models/sequelize/AmiiboModelFactory';
import {amiiboSeriesModelFactory} from './models/sequelize/AmiiboSeriesModelFactory';
import {collectionItemModelFactory} from './models/sequelize/CollectionItemModelFactory';
import {collectionModelFactory} from './models/sequelize/CollectionModelFactory';
import {IConfig, Config} from './config';
import {Sequelize, Model} from 'sequelize';

promiseFinally.shim();

const container = new Container({ defaultScope: "Singleton" });

container.bind<IConfig>(TYPES.Config).toConstantValue(Config);

//Models
container.bind<Sequelize>(TYPES.Models.DataStore).toDynamicValue(dataStoreFactory);
container.bind<Model<IAmiiboSeries, any>>(TYPES.Models.AmiiboSeriesModel).toDynamicValue(<any>amiiboSeriesModelFactory);
container.bind<Model<IAmiibo, any>>(TYPES.Models.AmiiboModel).toDynamicValue(<any>amiiboModelFactory);
container.bind<Model<ICollection, any>>(TYPES.Models.CollectionModel).toDynamicValue(<any>collectionModelFactory);
container.bind<Model<ICollectionItem, any>>(TYPES.Models.CollectionItemModel).toDynamicValue(<any>collectionItemModelFactory);

//Managers
container.bind<IAmiiboManager>(TYPES.Managers.AmiiboManager).to(AmiiboManager);
container.bind<IAmiiboSeriesManager>(TYPES.Managers.AmiiboSeriesManager).to(AmiiboSeriesManager);
container.bind<ICollectionManager>(TYPES.Managers.CollectionManager).to(CollectionManager);

//Messages
container.bind<IMessageFactory<IAmiibo, IAmiiboMessage>>(TYPES.Controllers.Messages.AmiiboMessageFactory)
  .to(AmiiboMessageFactory)

//Controllers
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller)
  .to(AmiibosController)
  .whenTargetNamed(NAMES.AmiibosControler);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller)
  .to(AmiiboSeriesController)
  .whenTargetNamed(NAMES.AmiiboSeriesController);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller)
  .to(OkComputerController)
  .whenTargetNamed(NAMES.OkComputerController);

export default container;