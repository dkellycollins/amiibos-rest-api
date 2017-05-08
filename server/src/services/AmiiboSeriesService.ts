import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiiboSeries} from '../models/AmiiboSeries';
import {TYPES} from '../types';

export interface IAmiiboSeriesService {
  search(name: string): Promise<IAmiiboSeries[]>;
  fetch(id: string): Promise<IAmiiboSeries>;
  resolveByName(name: string, displayName: string): Promise<IAmiiboSeries>;
  remove(id: string): Promise<void>;
}

@injectable()
export class AmiiboSeriesService implements IAmiiboSeriesService {

  constructor(@inject(TYPES.Models.AmiiboSeriesModel) private _amiiboSeriesModel: any) {

  }

  public search(name: string): Promise<IAmiiboSeries[]> {
    return this._amiiboSeriesModel.findAll({
      name: name
    });
  }

  public fetch(id: string): Promise<IAmiiboSeries> {
    return this._amiiboSeriesModel.find(id);
  }

  public resolveByName(name: string, displayName: string): Promise<IAmiiboSeries> {
    return this._amiiboSeriesModel.findAll({name: name})
      .then((series: IAmiiboSeries[]) => {
        if(_.isEmpty(series)) {
          return this._amiiboSeriesModel.create({
            name: name,
            displayName: displayName
          });
        }

        return this._amiiboSeriesModel.update(_.get(series, '[0]._id'), { displayName: displayName });
      });
  }

  public remove(id: string): Promise<void> {
    return this._amiiboSeriesModel.destroy(id);
  }
}