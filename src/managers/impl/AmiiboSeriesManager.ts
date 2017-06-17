import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiiboSeries} from '../../models';
import {TYPES} from '../../types';
import {IAmiiboSeriesManager, IAmiiboSeriesSearchCriteria, ICreateAmiiboSeriesInfo} from '../IAmiiboSeriesManager';
import {Model} from 'sequelize';

@injectable()
export class AmiiboSeriesManager implements IAmiiboSeriesManager {

  constructor(
    @inject(TYPES.Models.AmiiboSeriesModel) private _amiiboSeriesModel: Model<IAmiiboSeries, any>) {

  }

  public async search(criteria: IAmiiboSeriesSearchCriteria): Promise<IAmiiboSeries[]> {
    return await this._amiiboSeriesModel.findAll({
      where: {
        name: criteria.name
      }
    });
  }

  public async resolve(infos: ICreateAmiiboSeriesInfo[]): Promise<IAmiiboSeries[]> {
    const promises = _.map(infos, async (info) => {
      const result = await this._amiiboSeriesModel.findOrBuild({
        where: {name: info.name},
        defaults: {
          name: info.name,
          displayName: info.displayName
        }
      });
      const series = result[0];

      series.set({
        displayName: info.displayName
      });

      return <any>(await series.save());
    });

    return await Promise.all(promises);
  }

  public async remove(name: string): Promise<void> {
    await this._amiiboSeriesModel.destroy({
      where: { name: name }
    });
  }
}