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

  public async search(criteria: IAmiiboSearchCriteria): Promise<IAmiibo[]> {
    return await this._amiiboModel.findAll(criteria);
  }

  public async resolve(infos: ICreateAmiiboInfo[]): Promise<IAmiibo[]> {
    try {
      const seriesInfo = _.chain(infos)
        .map('series')
        .compact()
        .uniqBy('name')
        .value();

      const series = await this._amiiboSeriesManager.resolve(seriesInfo);
      const seriesByName = _.keyBy(series, 'name');
      const promises = _.map(infos, async (info: ICreateAmiiboInfo) => {
        const amiibos = await this.search({ name: info.name });
        const amiibo = _.first(amiibos);
        const series = (!!info.series) ? seriesByName[info.series.name] : void 0;

        return await (!!amiibo) 
          ? this.update(amiibo._id, info, series) 
          : this.create(info, series);
      });

      return await Promise.all(promises);
    }
    catch(err) {
      if(!!err.errors) { //Validation error.
        const validationErrors = _.map(err.errors, (error: any) => `Expected ${error.expected} for ${error.path}. Actual: ${error.actual}`).join(',');
        throw new Error(validationErrors);
      }

      throw err;
    }    
  }

  public async remove(name: string): Promise<void> {
    return await this._amiiboModel.destroyAll({
      name: name
    });
  }

  private async create(info: ICreateAmiiboInfo, series?: IAmiiboSeries): Promise<IAmiibo> {
    return await this._amiiboModel.create({
      name: info.name,
      displayName: info.displayName,
      releaseDate: info.releaseDate,
      series: series
    })
  }

  private async update(id:string, info: ICreateAmiiboInfo, series?: IAmiiboSeries): Promise<IAmiibo> {
    return await this._amiiboModel.update(id, {
      name: info.name,
      displayName: info.displayName,
      releaseDate: info.releaseDate,
      series: series
    })
  } 
}