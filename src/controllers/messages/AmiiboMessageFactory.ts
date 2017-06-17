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
      const message = {
        name: model.name,
        displayName: model.displayName,
        releaseDate: model.releaseDate
      }

      const series = model.getAmiiboSeries();
      if(!!series) {
        message['series'] = {
          name: series.name,
          displayName: series.displayName
        }
      }

      return message;
    });
  }
}