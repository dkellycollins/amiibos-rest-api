import {interfaces} from 'inversify';
import * as Sequelize from 'Sequelize';
import {TYPES} from '../../types';
import {ICollection} from '../ICollection';

export function collectionModelFactory(context: interfaces.Context): Sequelize.Model<ICollection, any> {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);

  const collectionModel = sql.define<ICollection, any>('collection', {
    
  });

  return collectionModel;
}