import 'reflect-metadata';
import * as _ from 'lodash';
import {Container, interfaces} from 'inversify';
import {interfaces as expressUtilInterfaces, TYPE} from 'inversify-express-utils';
import {TYPES} from './types';
import {NAMES} from './controllers/Constants';
import {AmiibosController} from './controllers/amiibosController';
import {AmiiboSeriesController} from './controllers/AmiiboSeriesController';
import {OkComputerController} from './controllers/OkComputerController';
import {IAmiiboSeriesService, AmiiboSeriesService} from './services/AmiiboSeriesService';
import {dataStoreFactory, modelFactory} from './models/dataStoreFactory';
import {IAmiibo} from './models/amiibo';
import {IAmiiboSeries} from './models/AmiiboSeries';
import {IConfig, Config} from './config';

const container = new Container({ defaultScope: "Singleton" });

container.bind<IConfig>(TYPES.Config).toConstantValue(Config);

//Models
container.bind<any>(TYPES.Models.DataStore).toDynamicValue(dataStoreFactory);
container.bind<any>(TYPES.Models.AmiiboModel).toDynamicValue(_.partial(modelFactory, 'amiibo'));
container.bind<any>(TYPES.Models.AmiiboSeriesModel).toDynamicValue(_.partial(modelFactory, 'amiiboSeries'));

//Services
container.bind<IAmiiboSeriesService>(TYPES.Services.AmiiboSeriesService).to(AmiiboSeriesService);

//Controllers
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller).to(AmiibosController).whenTargetNamed(NAMES.AmiiboControler);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller).to(AmiiboSeriesController).whenTargetNamed(NAMES.AmiiboSeriesController);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller).to(OkComputerController).whenTargetNamed(NAMES.OkComputerController);

export default container;