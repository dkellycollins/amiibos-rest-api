import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {IAmiibo} from '../models/amiibo';
import {IAmiiboManager} from '../managers/AmiiboManager';
import {IMessageFactory} from './messages/IMessageFactory';
import {IAmiiboMessage} from './messages/AmiiboMessageFactory';
import {TYPES} from '../TYPES';

@injectable()
@Controller('/amiibos')
export class AmiibosController {

  constructor(
    @inject(TYPES.Managers.AmiiboManager) private _amiiboManager: IAmiiboManager,
    @inject(TYPES.Controllers.Messages.AmiiboMessageFactory) private _amiiboMessageFactory: IMessageFactory<IAmiibo, IAmiiboMessage>) {
  }

  @Get('/')
  public async search(req: Request): Promise<IAmiiboMessage[]> {
    const searchResults = await this._amiiboManager.search(req.params);
    return await this._amiiboMessageFactory.toMessages(searchResults);
  }

  @Put('/')
  public async resolve(req: Request): Promise<IAmiiboMessage[]>{
    const amiibos = await this._amiiboManager.resolve(req.body);
    return await this._amiiboMessageFactory.toMessages(amiibos);
  }

  @Delete('/:name')
  public async remove(req: Request): Promise<boolean> {
    await this._amiiboManager.remove(req.params.name);
    return true;
  }
}