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
import * as Sequelize from 'sequelize';
import {namespace} from './cls';
import * as Umzug from 'umzug';

//Environment Setup
promiseFinally.shim();
Sequelize['useCLS'](namespace);

const container = new Container({ defaultScope: "Singleton" });

//Config
container.bind<IConfig>(TYPES.Config).toConstantValue(Config);

//Models
container.bind<Sequelize.Sequelize>(TYPES.Models.DataStore).toDynamicValue(dataStoreFactory);
container.bind<Sequelize.Model<IAmiiboSeries, any>>(TYPES.Models.AmiiboSeriesModel).toDynamicValue(<any>amiiboSeriesModelFactory);
container.bind<Sequelize.Model<IAmiibo, any>>(TYPES.Models.AmiiboModel).toDynamicValue(<any>amiiboModelFactory);
container.bind<Sequelize.Model<ICollection, any>>(TYPES.Models.CollectionModel).toDynamicValue(<any>collectionModelFactory);
container.bind<Sequelize.Model<ICollectionItem, any>>(TYPES.Models.CollectionItemModel).toDynamicValue(<any>collectionItemModelFactory);

container.bind<Umzug.Umzug>(TYPES.Models.Migrator).toConstantValue(new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: container.get<Sequelize.Sequelize>(TYPES.Models.DataStore)
  },
  logging: console.log,
  migrations: {
    path: './src/models/migrations'
  }
}));

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