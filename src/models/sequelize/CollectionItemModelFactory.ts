import {interfaces} from 'inversify';
import * as Sequelize from 'sequelize';
import {TYPES} from '../../types';
import {ICollectionItem} from '../ICollectionItem';

export function collectionItemModelFactory(context: interfaces.Context): Sequelize.Model<ICollectionItem, any> {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  const collelctionModel = context.container.get<any>(TYPES.Models.CollectionModel);

  const collectionItemModel = sql.define<ICollectionItem, any>('collectionItem', {
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