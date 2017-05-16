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
  public async search(req: Request): Promise<IAmiibo[]> {
    return await this._amiiboManager.search(req.params);
  }

  @Put('/')
  public async resolve(req: Request): Promise<IAmiibo[]>{
    return await this._amiiboManager.resolve(req.body);
  }

  @Delete('/:name')
  public async remove(req: Request): Promise<void> {
    return await this._amiiboManager.remove(req.params.name);
  }
}