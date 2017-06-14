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
  AmiiboManager,
  IAmiiboSeriesManager,
  AmiiboSeriesManager,
  ICollectionManager,
  CollectionManager
} from './managers';
import {
  IAmiibo,
  IAmiiboSeries,
  ICollection,
  ICollectionItem
} from './models';
import {dataStoreFactory, modelFactory} from './models/js-data/DataStoreFactory';
import {IConfig, Config} from './config';

promiseFinally.shim();

const container = new Container({ defaultScope: "Singleton" });

container.bind<IConfig>(TYPES.Config).toConstantValue(Config);

//Models
container.bind<any>(TYPES.Models.DataStore).toDynamicValue(dataStoreFactory);
container.bind<any>(TYPES.Models.AmiiboModel).toDynamicValue(_.partial(modelFactory, 'amiibo'));
container.bind<any>(TYPES.Models.AmiiboSeriesModel).toDynamicValue(_.partial(modelFactory, 'amiiboSeries'));
container.bind<any>(TYPES.Models.CollectionModel).toDynamicValue(_.partial(modelFactory, 'collection'));
container.bind<any>(TYPES.Models.CollectionItemModel).toDynamicValue(_.partial(modelFactory, 'collectionItem'));

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