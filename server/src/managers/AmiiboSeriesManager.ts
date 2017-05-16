import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiiboSeries} from '../models/AmiiboSeries';
import {TYPES} from '../types';

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

@injectable()
export class AmiiboSeriesManager implements IAmiiboSeriesManager {

  constructor(@inject(TYPES.Models.AmiiboSeriesModel) private _amiiboSeriesModel: any) {

  }

  public async search(name: string): Promise<IAmiiboSeries[]> {
    return await this._amiiboSeriesModel.findAll({
      name: name
    });
  }

  public async fetch(id: string): Promise<IAmiiboSeries> {
    return await this._amiiboSeriesModel.find(id);
  }

  public async resolveByName(name: string, displayName: string): Promise<IAmiiboSeries> {
    const series = await this._amiiboSeriesModel.findAll({name: name});

    if(_.isEmpty(series)) {
      return await this._amiiboSeriesModel.create({
        name: name,
        displayName: displayName
      });
    }

    const id = series[0]._id;
    return await this._amiiboSeriesModel.update(id, {
      displayName: displayName
    });
  }

  public async remove(id: string): Promise<void> {
    return await this._amiiboSeriesModel.destroy(id);
  }
}