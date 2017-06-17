import {ICollection} from '../models';

export interface ICreateCollectionInfo {
  items?: ICollectionItemInfo[];
}

export interface ICollectionItemInfo {
  itemType: string;
  itemId: string;
}

export interface ICollectionManager {

  fetch(id: number): Promise<ICollection>;

  create(info: ICreateCollectionInfo): Promise<ICollection>;

  remove(id: number): Promise<void>;

  saveItems(id: number, itemInfos: ICollectionItemInfo[]): Promise<ICollection>;

}