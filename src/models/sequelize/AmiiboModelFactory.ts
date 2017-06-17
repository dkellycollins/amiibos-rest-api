import {interfaces} from 'inversify';
import * as Sequelize from 'Sequelize';
import {TYPES} from '../../types';

export function amiiboModelFactory(context: interfaces.Context): any {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  const amiiboSeriesModel = context.container.get<any>(TYPES.Models.AmiiboSeriesModel);

  const amiiboModel = sql.define('amiibo', {
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
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  });

  amiiboModel.belongsTo(amiiboSeriesModel);

  return amiiboModel;
}