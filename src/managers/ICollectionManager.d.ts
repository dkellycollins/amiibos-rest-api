import {ICollection} from '../models';

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

  remove(id: string): Promise<void>;

  saveItems(id: string, itemInfos: ICollectionItemInfo[]): Promise<ICollection>;

}