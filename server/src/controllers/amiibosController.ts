import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {Amiibo, TYPE as TAmiibo} from '../models/amiibo';

@injectable()
@Controller('/amiibos')
export class AmiibosController {

  constructor(@inject(TAmiibo) private _amiibo) {
  }

  @Get('/')
  public search(): any[] {
    return this._amiibo.findAll();
  }

  @Post('/')
  public create(req: Request): any {
    return this._amiibo.create(req.body);
  }
}

export const NAME = 'AmiibosController';
export const TYPE = Symbol('AmiibosController');