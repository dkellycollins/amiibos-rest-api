import {IModel, IAmiibo} from '../models';

export interface IAmiiboSeries extends IModel {
  name: string;
  displayName: string;

  amiibos: IAmiibo[];
}