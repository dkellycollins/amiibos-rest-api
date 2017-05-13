import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {ICollection} from '../models';
import {TYPES} from '../types';

export interface ICreateCollectionInfo {
  items?: ICollectionItemInfo[];
}

export interface ICollectionItemInfo {
  itemType: string;
  itemId: string;
}

export interface ICollectionManager {

  fetch(id: string): Promise<ICollection>;

  create(info: ICreateCollectionInfo): Promise<ICollection>;

  remove(id: string): Promise<ICollection>;

  saveItems(id: string, itemInfos: ICollectionItemInfo[]): Promise<ICollection>;

}

@injectable()
export class CollectionManager implements ICollectionManager {

  constructor(
    @inject(TYPES.Models.CollectionModel) private _collectionModel: any,
    @inject(TYPES.Models.CollectionItemModel) private _collectionItemModel: any) {

  }

  public async fetch(id: string): Promise<ICollection> {
    return await this._collectionModel.find(id);
  }

  public async create(info: ICreateCollectionInfo): Promise<ICollection> {
    const collection = await this._collectionModel.create(info);

    if(!_.isEmpty(info.items)) {
      await this.saveItems(collection._id, info.items);
    }

    return collection;
  }

  public async remove(id: string): Promise<ICollection> {
    return await this._collectionModel.destroy(id);
  }

  public async saveItems(id: string, itemInfos: ICollectionItemInfo[]): Promise<ICollection> {
    const collectionItems = await this._collectionItemModel.findAll({collection_id: id});
    const collectionItemIds = _.map(collectionItems, '_id');
    await this._collectionItemModel.destroyAll(collectionItemIds);

    const newItemInfos = _.map(itemInfos, (info) => {
      return _.merge({}, info, {
        collection_id: id
      });
    });
    await this._collectionItemModel.createMany(newItemInfos);

    return await this._collectionModel.find(id);
  }
}