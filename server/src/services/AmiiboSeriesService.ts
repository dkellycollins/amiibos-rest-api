import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiiboSeries} from '../models/AmiiboSeries';
import {TYPES} from '../types';

export interface IAmiiboSeriesService {
  resolveByName(name: string): Promise<IAmiiboSeries>;
}

@injectable()
export class AmiiboSeriesService implements IAmiiboSeriesService {

  constructor(@inject(TYPES.Models.AmiiboSeriesModel) private _amiiboSeriesModel: any) {

  }

  public resolveByName(name: string): Promise<IAmiiboSeries> {
    return this._amiiboSeriesModel.findAll({name: name})
      .then((series: IAmiiboSeries[]) => {
        if(_.isEmpty(series)) {
          return this._amiiboSeriesModel.create({
            name: name
          });
        }

        return _.first(series);
      });
  }
}