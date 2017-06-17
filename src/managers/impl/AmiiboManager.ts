import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiibo, IAmiiboSeries} from '../../models';
import {IAmiiboManager, IAmiiboSearchCriteria, ICreateAmiiboInfo} from '../IAmiiboManager';
import {ICreateAmiiboSeriesInfo, IAmiiboSeriesManager} from '../IAmiiboSeriesManager';
import {TYPES} from '../../types';
import {Model} from 'sequelize';
import {ifNotNull} from '../../helpers';

@injectable()
export class AmiiboManager implements IAmiiboManager {

  constructor(
    @inject(TYPES.Models.AmiiboModel) private _amiiboModel: Model<IAmiibo, any>,
    @inject(TYPES.Managers.AmiiboSeriesManager) private _amiiboSeriesManager: IAmiiboSeriesManager) {

  }

  public async search(criteria: IAmiiboSearchCriteria): Promise<IAmiibo[]> {
    let amiiboSeriesId = null;
    if(!_.isUndefined(criteria.series)) {
      amiiboSeriesId = await this.getAmiiboSeriesId(criteria.series);

      if(amiiboSeriesId === null) {
        return [];
      }
    }

    const query = {};
    ifNotNull(criteria.name, (name) => query['name'] = name);
    ifNotNull(amiiboSeriesId, (id) => query['amiiboSeriesId'] = id);

    return await this._amiiboModel.findAll({
      where: query
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
        const seriesId = (!!info.series) ? seriesByName[info.series.name].id : null;

        const result = await this._amiiboModel.findOrBuild({
          where: { name: info.name}
        });
        const amiibo = result[0];

        amiibo.set({
          displayName: info.displayName,
          releastDate: info.releaseDate,
          amiiboSeriesId: seriesId
        });

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

  private async getAmiiboSeriesId(name: string): Promise<number> {
    if(!name) return null;

    const series = await this._amiiboSeriesManager.search({name: name});
    return (series.length > 0) ?  _.first(series).id : null;
  }
}