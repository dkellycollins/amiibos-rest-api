import {interfaces} from 'inversify';
import * as Sequelize from 'Sequelize';
import {TYPES} from '../../types';

export function collectionItemModelFactory(context: interfaces.Context): any {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  const collelctionModel = context.container.get<any>(TYPES.Models.CollectionModel);

  const collectionItemModel = sql.define('collectionItem', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    itemType: {
      type: Sequelize.STRING(256),
      allowNull: false
    },
    itemKey: {
      type: Sequelize.STRING(256),
      allowNull: false
    }
  });

  collectionItemModel.belongsTo(collelctionModel);

  return collectionItemModel;
}