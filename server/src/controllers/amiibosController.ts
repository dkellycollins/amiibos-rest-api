import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../TYPES';
import {IAmiibo} from '../models/amiibo';
import {IAmiiboSeries} from '../models/AmiiboSeries';
import {IAmiiboSeriesService} from '../services/AmiiboSeriesService';

@injectable()
@Controller('/amiibos')
export class AmiibosController {

  constructor(@inject(TYPES.Models.AmiiboModel) private _amiiboModel: any,
              @inject(TYPES.Services.AmiiboSeriesService) private _amiiboSeriesService: IAmiiboSeriesService) {
  }

  @Get('/')
  public search(): Promise<IAmiibo[]> {
    return this._amiiboModel.findAll();
  }

  @Get('/:id')
  public retrieve(req: Request): Promise<IAmiibo> {
    return this._amiiboModel.find(req.params.id);
  }

  @Post('/')
  public create(req: Request): Promise<IAmiibo> {
    const seriesNames = _.chain(req.body)
      .map('series')
      .uniq()
      .value();

    return Promise.all(_.map(seriesNames, (name: string) => this._amiiboSeriesService.resolveByName(name)))
      .then((series: IAmiiboSeries[]) => {
        const seriesByName = _.keyBy(series, 'name');
        const models = _.map(req.body, (message) => {
          return {
            name: message.name,
            releaseDate: message.releaseDate,
            amiibo_series_id: seriesByName[message.series]._id
          };
        });

        return this._amiiboModel.createMany(models);
      });
  }

  @Post('/:id')
  public update(req: Request): Promise<IAmiibo> {
    return Promise.reject('Not Implemented');
  }

  @Delete('/:id')
  public remove(req: Request): Promise<void> {
    return this._amiiboModel.destroy(req.params.id);
  }
}