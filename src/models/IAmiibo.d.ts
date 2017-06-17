import {IModel, IAmiiboSeries} from '../models';

export interface IAmiibo extends IModel<any> {
  name: string;
  displayName: string;
  releaseDate?: string;

  getAmiiboSeries(): Promise<IAmiiboSeries>;
}