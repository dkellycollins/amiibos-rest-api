import {interfaces} from 'inversify';
import * as Sequelize from 'Sequelize';
import {TYPES} from '../../types';
import {IAmiiboSeries} from '../IAmiiboSeries';

export function amiiboSeriesModelFactory(context: interfaces.Context): Sequelize.Model<IAmiiboSeries, any> {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);

  const amiiboSeriesModel = sql.define<IAmiiboSeries, any>('amiiboSeries', {
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