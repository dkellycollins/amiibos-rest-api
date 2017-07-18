import {interfaces} from 'inversify';
import * as Sequelize from 'sequelize';
import {TYPES} from '../../types';
import {IAccountIdentity} from '../IAccountIdentity';
import {IAccount} from '../IAccount';

export function userModelFactory(context: interfaces.Context): Sequelize.Model<IAccountIdentity, any> {
  const sql = context.container.get<Sequelize.Sequelize>(TYPES.Models.DataStore);
  const accountModel = context.container.get<IAccount>(TYPES.Models.AccountModel);

  const accountIdentityModel = sql.define<IAccount, any>('accountIdentity', {
    provider: {
      type: Sequelize.STRING(256),
      allowNull: false
    }
    identity: {
      type: Sequelize.STRING(256),
      allowNull: false
    }
  });

  accountIdentityModel.belongsTo(accountModel, {
    as: 'Account',
    foreignKey: 'accountId'
  })

  return accountIdentityModel;
}