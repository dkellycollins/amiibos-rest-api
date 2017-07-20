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
    throw new Error('Not Implemented');
  }

  public async create(info: ICreateCollectionInfo): Promise<ICollection> {
    throw new Error('Not Implemented');
  }

  public async remove(id: number): Promise<void> {
    throw new Error('Not Implemented');
  }

  public async saveItems(id: number, itemInfos: ICollectionItemInfo[]): Promise<ICollection> {
    throw new Error('Not Implemented');
  }
}