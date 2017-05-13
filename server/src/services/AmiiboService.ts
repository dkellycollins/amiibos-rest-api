import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiibo} from '../models/Amiibo';
import {IAmiiboSeries} from '../models/AmiiboSeries';
import {IAmiiboSeriesService} from './AmiiboSeriesService';
import {TYPES} from '../types';

export interface ICreateAmiiboInfo {
  name: string;
  displayName: string;
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

  public async search(criteria: any): Promise<IAmiibo[]> {
    return await this._amiiboModel.findAll();
  }

  public async fetch(id: string): Promise<IAmiibo> {
    return await this._amiiboModel.find(id);
  }

  public async create(infos: ICreateAmiiboInfo[]): Promise<IAmiibo[]> {
    const seriesNames = _.chain(infos)
      .map('series')
      .compact()
      .uniq()
      .value();

    const series = await Promise.all(_.map(seriesNames, _.bind(this.resolveSeries, this)));
    const seriesByName = _.keyBy(series, 'name');
    const newInfos = _.map(infos, (info: ICreateAmiiboInfo) => {
      return {
        name: info.name,
        displayName: info.displayName,
        releaseDate: info.releaseDate,
        amiibo_series_id: _.get(seriesByName, `${info.series}._id`)
      };
    });

    return await this._amiiboModel.createMany(newInfos);
  }

  public async update(id: string, info: any): Promise<IAmiibo> {
    return Promise.reject('Not Implemented');
  }

  public async remove(id: string): Promise<void> {
    return await this._amiiboModel.destroy(id);
  }

  private async resolveSeries(name: string): Promise<IAmiiboSeries> {
    const uniqueName = _.snakeCase(name);
    return await this._amiiboSeriesService.resolveByName(uniqueName, name);
  } 
}