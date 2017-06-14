import {IModel, IAmiiboSeries} from '../models';

export interface IAmiibo extends IModel {
  name: string;
  displayName: string;
  releaseDate?: string;

  amiibo_series_id?: string;
  series?: IAmiiboSeries;
}