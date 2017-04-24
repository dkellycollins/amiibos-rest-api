import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {IAmiibo} from '../models/amiibo';
import {IAmiiboService} from '../services/AmiiboService';
import {TYPES} from '../TYPES';

@injectable()
@Controller('/amiibos')
export class AmiibosController {

  constructor(@inject(TYPES.Services.AmiiboService) private _amiiboService: IAmiiboService) {
  }

  @Get('/')
  public search(): Promise<IAmiibo[]> {
    return this._amiiboService.search({});
  }

  @Get('/:id')
  public fetch(req: Request): Promise<IAmiibo> {
    return this._amiiboService.fetch(req.params.id);
  }

  @Post('/')
  public create(req: Request): Promise<IAmiibo[]> {
    return this._amiiboService.create(req.body);
  }

  @Post('/:id')
  public update(req: Request): Promise<IAmiibo> {
    return this._amiiboService.update(req.params.id, req.body);
  }

  @Delete('/:id')
  public remove(req: Request): Promise<void> {
    return this._amiiboService.remove(req.params.id);
  }
}