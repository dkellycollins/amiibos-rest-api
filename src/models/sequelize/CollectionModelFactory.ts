import {interfaces} from 'inversify';
import * as Sequelize from 'Sequelize';
import {TYPES} from '../../types';

export function collectionModelFactory(context: interfaces.Context): any {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);

  const collectionModel = sql.define('collection', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  });

  return collectionModel;
}