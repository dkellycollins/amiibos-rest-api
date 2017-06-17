import {IModel, ICollectionItem} from '../models';

export interface ICollection extends IModel<any> {
  items: ICollectionItem[];
}