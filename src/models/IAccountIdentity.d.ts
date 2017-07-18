import {IModel} from '../models';
import {IAccount} from './IAccount';

export interface IAccountIdentity extends IModel<any> {
  provider: string;
  identity: string;

  getAccount(): Promise<IAccount>;
}