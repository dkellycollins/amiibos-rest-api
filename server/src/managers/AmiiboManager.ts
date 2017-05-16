import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiibo, IAmiiboSeries} from '../models';
import {ICreateAmiiboSeriesInfo, IAmiiboSeriesManager} from './AmiiboSeriesManager';
import {TYPES} from '../types';

export interface IAmiiboSearchCriteria {
  name?: string;
  series?: string;
}

export interface ICreateAmiiboInfo {
  name: string;
  displayName: string;
  releaseDate?: string;
  series?: ICreateAmiiboSeriesInfo;
}

export interface IAmiiboManager {

  search(criteria: IAmiiboSearchCriteria): Promise<IAmiibo[]>;

  resolve(infos: ICreateAmiiboInfo[]): Promise<IAmiibo[]>;

  remove(name: string): Promise<void>;
}

@injectable()
export class AmiiboManager implements IAmiiboManager {

  constructor(
    @inject(TYPES.Models.AmiiboModel) private _amiiboModel: any,
    @inject(TYPES.Managers.AmiiboSeriesManager) private _amiiboSeriesManager: IAmiiboSeriesManager) {

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
    return await this._amiiboSeriesManager.resolveByName(uniqueName, name);
  } 
}