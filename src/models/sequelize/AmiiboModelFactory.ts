import {interfaces} from 'inversify';
import * as Sequelize from 'sequelize';
import {TYPES} from '../../types';
import {IAmiibo} from '../IAmiibo';

export function amiiboModelFactory(context: interfaces.Context): Sequelize.Model<IAmiibo, any> {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  const amiiboSeriesModel = context.container.get<any>(TYPES.Models.AmiiboSeriesModel);

  const amiiboModel = sql.define<IAmiibo, any>('amiibo', {
    name: {
      type: Sequelize.STRING(256),
      unique: true,
      allowNull: false
    },
    displayName: {
      type: Sequelize.STRING(256),
      allowNull: false
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  });

  amiiboModel.belongsTo(amiiboSeriesModel, {
    as: 'AmiiboSeries',
    foreignKey: 'amiiboSeriesId'
  });

  return amiiboModel;
}