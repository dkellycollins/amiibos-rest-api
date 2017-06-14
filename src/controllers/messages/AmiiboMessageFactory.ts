import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {IMessageFactory} from './IMessageFactory';
import {IAmiibo} from '../../models';

export interface IAmiiboMessage {
  name: string;
  displayName: string;
  releaseDate?: string;
  series?: {
    name: string,
    displayName: string 
  };
}

@injectable()
export class AmiiboMessageFactory implements IMessageFactory<IAmiibo, IAmiiboMessage> {

  constructor() {

  }

  public async toMessages(models: IAmiibo[]): Promise<IAmiiboMessage[]> {
    return _.map(models, (model) => {
      const series = (!!model.series)
        ? {
          name: model.series.name,
          displayName: model.series.displayName
        }
        : undefined;

      return {
        name: model.name,
        displayName: model.displayName,
        releaseDate: model.releaseDate,
        series: series
      };
    });
  }
}