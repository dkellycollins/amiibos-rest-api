import {IModel, IAmiibo} from '../models';

export interface IAmiiboSeries extends IModel<any> {
  name: string;
  displayName: string;
}