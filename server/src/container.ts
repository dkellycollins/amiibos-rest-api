import 'reflect-metadata';
import {Container} from 'inversify';
import {interfaces, TYPE} from 'inversify-express-utils';
import {AmiibosController, NAME as AmiiboControllerName} from './controllers/amiibosController';
import {Amiibo, TYPE as TAmiibos} from './models/amiibo';

const container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(AmiibosController).inSingletonScope().whenTargetNamed(AmiiboControllerName);
container.bind<any>(TAmiibos).to(Amiibo).inSingletonScope()

export default container;