import {IModel, ICollectionItem} from '../models';

export interface ICollection extends IModel {
  items: ICollectionItem[];
}