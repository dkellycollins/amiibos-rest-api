import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IAmiiboSeries} from '../../models';
import {TYPES} from '../../types';
import {IAmiiboSeriesManager, IAmiiboSeriesSearchCriteria, ICreateAmiiboSeriesInfo} from '../IAmiiboSeriesManager';
import {Sequelize, Model} from 'sequelize';

@injectable()
export class AmiiboSeriesManager implements IAmiiboSeriesManager {

  constructor(
    @inject(TYPES.Models.DataStore) private _sql: Sequelize,
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
    return await this._sql.transaction(async (transaction) => {
      try {
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
      catch(err) {
        if(!!err.errors) { //Validation error.
          const validationErrors = _.map(err.errors, (error: any) => `Expected ${error.expected} for ${error.path}. Actual: ${error.actual}`).join(',');
          throw new Error(validationErrors);
        }

        throw err;
      }
    });
  }

  public async remove(name: string): Promise<void> {
    await this._amiiboSeriesModel.destroy({
      where: { name: name }
    });
  }
}