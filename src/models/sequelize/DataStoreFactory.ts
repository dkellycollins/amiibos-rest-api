import {interfaces} from 'inversify';
import * as Sequelize from 'sequelize';
import {IConfig} from '../../config';
import {TYPES} from '../../types';

export function dataStoreFactory(context: interfaces.Context): Sequelize.Sequelize {
  const config = context.container.get<IConfig>(TYPES.Config);

  return new Sequelize(config.sequelize.url, config.sequelize.options);  
}