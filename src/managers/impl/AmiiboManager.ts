import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiibo, IAmiiboSeries} from '../../models';
import {IAmiiboManager, IAmiiboSearchCriteria, ICreateAmiiboInfo} from '../IAmiiboManager';
import {ICreateAmiiboSeriesInfo, IAmiiboSeriesManager} from '../IAmiiboSeriesManager';
import {TYPES} from '../../types';
import {Model} from 'sequelize';

@injectable()
export class AmiiboManager implements IAmiiboManager {

  constructor(
    @inject(TYPES.Models.AmiiboModel) private _amiiboModel: Model<IAmiibo, any>,
    @inject(TYPES.Managers.AmiiboSeriesManager) private _amiiboSeriesManager: IAmiiboSeriesManager) {

  }

  public async search(criteria: IAmiiboSearchCriteria): Promise<IAmiibo[]> {
    let amiibo_series_id = undefined;
    if(!!criteria.series) {
      const series = await this._amiiboSeriesManager.search({name: criteria.series});
      if(series.length === 0) {
        return [];
      }

      amiibo_series_id = _.first(series).id;
    }

    return await this._amiiboModel.findAll({
      where: {
        name: criteria.name
      }
    });
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
        const series = (!!info.series) ? seriesByName[info.series.name] : null;

        const result = await this._amiiboModel.findOrBuild({
          where: { name: info.name},
          defaults: {
            name: info.name,
            displayName: info.displayName,
            releaseDate: info.releaseDate
          }
        });
        const amiibo = result[0];

        amiibo.set({
          displayName: info.displayName,
          releastDate: info.releaseDate
        });
        amiibo.setAmiiboSeries(series);

        return <any>(await amiibo.save());
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
    await this._amiiboModel.destroy({
      where: {name: name}
    });
  }
}