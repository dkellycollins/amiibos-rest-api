import {IAmiiboSeries} from '../models';

export interface IAmiiboSeriesSearchCriteria {
  name?: string;
}

export interface ICreateAmiiboSeriesInfo {
  name: string;
  displayName: string;
}

export interface IAmiiboSeriesManager {

  search(criteria: IAmiiboSeriesSearchCriteria): Promise<IAmiiboSeries[]>;

  resolve(infos: ICreateAmiiboSeriesInfo[]): Promise<IAmiiboSeries[]>;

  remove(name: string): Promise<void>;
}