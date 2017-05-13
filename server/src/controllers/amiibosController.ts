import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {IAmiibo} from '../models/amiibo';
import {IAmiiboManager} from '../managers/AmiiboManager';
import {TYPES} from '../TYPES';

@injectable()
@Controller('/amiibos')
export class AmiibosController {

  constructor(@inject(TYPES.Managers.AmiiboManager) private _amiiboManager: IAmiiboManager) {
  }

  @Get('/')
  public async search(): Promise<IAmiibo[]> {
    return await this._amiiboManager.search({});
  }

  @Get('/:id')
  public async fetch(req: Request): Promise<IAmiibo> {
    return await this._amiiboManager.fetch(req.params.id);
  }

  @Post('/')
  public async create(req: Request): Promise<IAmiibo[]> {
    return await this._amiiboManager.create(req.body);
  }

  @Post('/:id')
  public async update(req: Request): Promise<IAmiibo> {
    return await this._amiiboManager.update(req.params.id, req.body);
  }

  @Delete('/:id')
  public async remove(req: Request): Promise<void> {
    return await this._amiiboManager.remove(req.params.id);
  }
}