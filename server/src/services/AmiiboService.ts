import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiibo} from '../models/Amiibo';
import {IAmiiboSeries} from '../models/AmiiboSeries';
import {IAmiiboSeriesService} from './AmiiboSeriesService';
import {TYPES} from '../types';

export interface ICreateAmiiboInfo {
  name: string;
  releaseDate: string;
  series: string;
}

export interface IAmiiboService {

  search(criteria: any): Promise<IAmiibo[]>;

  fetch(id: string): Promise<IAmiibo>;

  create(infos: ICreateAmiiboInfo[]): Promise<IAmiibo[]>;

  update(id: string, info: any): Promise<IAmiibo>;

  remove(id: string): Promise<void>;
}

@injectable()
export class AmiiboService implements IAmiiboService {

  constructor(@inject(TYPES.Models.AmiiboModel) private _amiiboModel: any,
              @inject(TYPES.Services.AmiiboSeriesService) private _amiiboSeriesService: IAmiiboSeriesService) {

  }

  public search(criteria: any): Promise<IAmiibo[]> {
    return this._amiiboModel.findAll();
  }

  public fetch(id: string): Promise<IAmiibo> {
    return this._amiiboModel.find(id);
  }

  public create(infos: ICreateAmiiboInfo[]): Promise<IAmiibo[]> {
    const seriesNames = _.chain(infos)
      .map('series')
      .filter()
      .uniq()
      .value();

    return Promise.all(_.map(seriesNames, _.bind(this.resolveSeries, this)))
      .then((series: IAmiiboSeries[]) => {
        const seriesByName = _.keyBy(series, 'name');
        const models = _.map(infos, (info) => {
          return {
            name: info.name,
            displayName: info.displayName,
            releaseDate: info.releaseDate,
            amiibo_series_id: _.get(seriesByName, `${info.series}._id`)
          };
        });

        return this._amiiboModel.createMany(models);
      });
  }

  public update(id: string, info: any): Promise<IAmiibo> {
    return Promise.reject('Not Implemented');
  }

  public remove(id: string): Promise<void> {
    return this._amiiboModel.destroy(id);
  }

  private resolveSeries(name: string): Promise<IAmiiboSeries> {
    const uniqueName = _.snakeCase(name);
    return this._amiiboSeriesService.resolveByName(uniqueName, name);
  } 
}