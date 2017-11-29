import * as _ from 'lodash';
import {Container, interfaces} from 'inversify';
import {interfaces as expressUtilInterfaces, TYPE} from 'inversify-express-utils';
import {TYPES} from '../types';
import {
  NAMES,
  IMessageFactory, 
  AmiibosController,
  AmiiboMessageFactory,
  IAmiiboMessage, 
  AmiiboSeriesController,
  StatusController
} from '../controllers';
import {
  IAmiiboManager,
  AmiiboManager,
  IAmiiboSeriesManager,
  AmiiboSeriesManager
} from '../managers';
import {
  IAmiibo,
  IAmiiboSeries,
  dataStoreFactory,
  amiiboModelFactory,
  amiiboSeriesModelFactory
} from '../models';
import {IConfig, Config} from '../config';
import * as Sequelize from 'sequelize';
import {namespace} from '../cls';
import * as Umzug from 'umzug';
import {localApiKeyStrategyFactory} from '../authentication';
import {Strategy} from 'passport';

export const container = new Container({ defaultScope: 'Singleton' });

//Config
container.bind<IConfig>(TYPES.Config).toConstantValue(Config);

//Models
container.bind<Sequelize.Sequelize>(TYPES.Models.DataStore).toDynamicValue(dataStoreFactory);
container.bind<Sequelize.Model<IAmiiboSeries, any>>(TYPES.Models.AmiiboSeriesModel).toDynamicValue(<any>amiiboSeriesModelFactory);
container.bind<Sequelize.Model<IAmiibo, any>>(TYPES.Models.AmiiboModel).toDynamicValue(<any>amiiboModelFactory);

//Managers
container.bind<IAmiiboManager>(TYPES.Managers.AmiiboManager).to(AmiiboManager);
container.bind<IAmiiboSeriesManager>(TYPES.Managers.AmiiboSeriesManager).to(AmiiboSeriesManager);

//Authentication
container.bind<Strategy>(TYPES.PassportStrategy).toDynamicValue(localApiKeyStrategyFactory);

//Messages
container.bind<IMessageFactory<IAmiibo, IAmiiboMessage>>(TYPES.Controllers.Messages.AmiiboMessageFactory)
  .to(AmiiboMessageFactory);

//Controllers
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller)
  .to(AmiibosController)
  .whenTargetNamed(NAMES.AmiibosControler);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller)
  .to(AmiiboSeriesController)
  .whenTargetNamed(NAMES.AmiiboSeriesController);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller)
  .to(StatusController)
  .whenTargetNamed(NAMES.OkComputerController);
