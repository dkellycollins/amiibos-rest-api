import {interfaces} from 'inversify';
import * as Sequelize from 'sequelize';
import {TYPES} from '../../types';
import {IAccount} from '../IAccount';

export function userModelFactory(context: interfaces.Context): Sequelize.Model<IAccount, any> {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  const accountIdentityModel = context.container.get<IAccountIdentity>(TYPES.Models.AccountIdentity);

  const accountModel = sql.define<IAccount, any>('collection', {
    identity: {
      type: Sequelize.STRING(256),
      unique: true,
      allowNull: false
    }
  });

  accountModel.hasMany(accountIdentityModel)

  return accountModel;
}