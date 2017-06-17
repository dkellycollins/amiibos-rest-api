import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {ICollection, ICollectionItem} from '../../models';
import {TYPES} from '../../types';
import {ICollectionManager, ICreateCollectionInfo, ICollectionItemInfo} from '../ICollectionManager';
import {Model} from 'sequelize';

@injectable()
export class CollectionManager implements ICollectionManager {

  constructor(
    @inject(TYPES.Models.CollectionModel) private _collectionModel: Model<ICollection, any>,
    @inject(TYPES.Models.CollectionItemModel) private _collectionItemModel: Model<ICollectionItem, any>) {

  }

  public async fetch(id: number): Promise<ICollection> {
    return await this._collectionModel.find(id);
  }

  public async create(info: ICreateCollectionInfo): Promise<ICollection> {
    const collection = await this._collectionModel.create(info);

    if(!_.isEmpty(info.items)) {
      await this.saveItems(collection.id, info.items);
    }

    return collection;
  }

  public async remove(id: number): Promise<void> {
    await this._collectionModel.destroy({
      where: {id: id}
    });
  }

  public async saveItems(id: number, itemInfos: ICollectionItemInfo[]): Promise<ICollection> {
    throw new Error('Not Implemented');
  }
}