import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Patch, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../TYPES';
import {IAmiiboSeriesService} from '../services/AmiiboSeriesService';
import {IAmiiboSeries} from '../models/AmiiboSeries';

@injectable()
@Controller('/amiibo-series')
export class AmiiboSeriesController {

  constructor(@inject(TYPES.Services.AmiiboSeriesService) private _amiiboSeriesService: IAmiiboSeriesService) {

  }

  @Get('/')
  public search(req: Request): Promise<IAmiiboSeries[]> {
    return Promise.reject('Not Implemented');
  }

  @Get('/:id')
  public retrieve(req: Request): Promise<IAmiiboSeries> {
    return Promise.reject('Not Implemented');
  }

  @Patch('/')
  public resolve(req: Request): Promise<IAmiiboSeries[]> {
    return Promise.all(_.map(req.body, (message) => {
      return this._amiiboSeriesService.resolveByName(message.name, message.displayName);
    }));
  }

  @Delete('/:id')
  public remove(req: Request): Promise<void> {
    return Promise.reject('Not Implemented');
  }
}