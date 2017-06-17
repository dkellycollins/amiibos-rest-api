import {IModel, ICollection} from '../models';

export interface ICollectionItem extends IModel<any> {
  itemType: string;
  itemId: string;

  collection_id: string;
  collection: ICollection;
}