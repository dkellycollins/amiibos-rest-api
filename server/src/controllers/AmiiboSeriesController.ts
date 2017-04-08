import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../TYPES';
import {IAmiiboSeries} from '../models/AmiiboSeries';

@injectable()
@Controller('/amiibo-series')
export class AmiiboSeriesController {

  constructor(@inject(TYPES.Models.AmiiboSeriesModel) private _amiiboSeriesModel: any) {

  }

  @Get('/')
  public search(req: Request): Promise<IAmiiboSeries[]> {
    return this._amiiboSeriesModel.findAll(req.query);
  }

  @Get('/:id')
  public retrieve(req: Request): Promise<IAmiiboSeries> {
    return this._amiiboSeriesModel.find(req.params.id);
  }

  @Delete('/:id')
  public removeEventListener(req: Request): Promise<void> {
    return this._amiiboSeriesModel.destroy(req.params.id);
  }
}