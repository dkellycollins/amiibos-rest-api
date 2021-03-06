import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../types';
import {IAmiiboSeriesManager} from '../managers';
import {IAmiiboSeries} from '../models';
import * as passport from 'passport';

@injectable()
@Controller('/amiibo-series')
export class AmiiboSeriesController {

  constructor(@inject(TYPES.Managers.AmiiboSeriesManager) private _amiiboSeriesManager: IAmiiboSeriesManager) {

  }

  @Get('/')
  public async search(req: Request): Promise<IAmiiboSeries[]> {
    return await this._amiiboSeriesManager.search(req.query.name);
  }

  @Put('/', passport.authenticate('localapikey', {session: false}))
  public async resolve(req: Request): Promise<IAmiiboSeries[]>{
    return await this._amiiboSeriesManager.resolve(req.body);
  }

  @Delete('/:name', passport.authenticate('localapikey', {session: false}))
  public async remove(req: Request): Promise<void> {
    return await this._amiiboSeriesManager.remove(req.params.name);
  }
}