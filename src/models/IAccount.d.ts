import {IModel} from '../models';

export interface IAccount extends IModel<any> {
  identity: string;
}