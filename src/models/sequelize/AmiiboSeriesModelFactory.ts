import {interfaces} from 'inversify';
import * as Sequelize from 'Sequelize';
import {TYPES} from '../../types';

export function amiiboSeriesModelFactory(context: interfaces.Context): any {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);

  const amiiboSeriesModel = sql.define('amiiboSeries', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(256),
      unique: true,
      allowNull: false
    },
    displayName: {
      type: Sequelize.STRING(256),
      allowNull: false
    }
  });

  return amiiboSeriesModel;
}