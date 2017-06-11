import {IAmiibo} from '../models';
import {ICreateAmiiboSeriesInfo} from '../managers';

export interface IAmiiboSearchCriteria {
  name?: string;
  series?: string;
}

export interface ICreateAmiiboInfo {
  name: string;
  displayName: string;
  releaseDate?: string;
  series?: ICreateAmiiboSeriesInfo;
}

export interface IAmiiboManager {

  search(criteria: IAmiiboSearchCriteria): Promise<IAmiibo[]>;

  resolve(infos: ICreateAmiiboInfo[]): Promise<IAmiibo[]>;

  remove(name: string): Promise<void>;
}