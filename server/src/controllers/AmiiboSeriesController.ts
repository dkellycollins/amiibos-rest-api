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
  public async search(req: Request): Promise<IAmiiboSeries[]> {
    return await this._amiiboSeriesService.search(req.query.name);
  }

  @Get('/:id')
  public async retrieve(req: Request): Promise<IAmiiboSeries> {
    return await this._amiiboSeriesService.fetch(req.params.id);
  }

  @Patch('/')
  public async resolve(req: Request): Promise<IAmiiboSeries[]> {
    const promises = _.map(req.body, (message: any) => {
      return this._amiiboSeriesService.resolveByName(message.name, message.displayName);
    });

    return await Promise.all(promises);
  }

  @Delete('/:id')
  public async remove(req: Request): Promise<void> {
    return await this._amiiboSeriesService.remove(req.params.id); 
  }
}