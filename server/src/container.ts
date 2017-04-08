import 'reflect-metadata';
import * as _ from 'lodash';
import {DS, DSResourceDefinition} from 'js-data';
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


const container = new Container({ defaultScope: "Singleton" });

//Controllers
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller).to(AmiibosController).whenTargetNamed(NAMES.AmiiboControler);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller).to(AmiiboSeriesController).whenTargetNamed(NAMES.AmiiboSeriesController);
container.bind<expressUtilInterfaces.Controller>(TYPE.Controller).to(OkComputerController).whenTargetNamed(NAMES.OkComputerController);

//Services
container.bind<IAmiiboSeriesService>(TYPES.Services.AmiiboSeriesService).to(AmiiboSeriesService);

//Models
container.bind<DS>(TYPES.Models.DataStore).toDynamicValue(dataStoreFactory);
container.bind<DSResourceDefinition<IAmiibo>>(TYPES.Models.AmiiboModel).toDynamicValue(_.partial(modelFactory, 'amiibo'));
container.bind<DSResourceDefinition<IAmiiboSeries>>(TYPES.Models.AmiiboSeriesModel).toDynamicValue(_.partial(modelFactory, 'amiiboSeries'));

export default container;