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
    const promises = _.map(models, async (model) => {
      const message = {
        name: model.name,
        displayName: model.displayName,
        releaseDate: model.releaseDate
      }

      const series = await model.getAmiiboSeries();
      if(!!series) {
        message['series'] = {
          name: series.name,
          displayName: series.displayName 
        };
      }

      return message;
    });

    return await Promise.all(promises);
  }
}