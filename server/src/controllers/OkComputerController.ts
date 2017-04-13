import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../TYPES';
import {IConfig} from '../config';

@injectable()
@Controller('/okcomputer')
export class OkComputerController {

  constructor(@inject(TYPES.Config) private _config: IConfig) {

  }

  @Get('/')
  public defaultCheck(): boolean {
    return true;
  }

  @Get('/env')
  public envCheck(): any {
    return {
      env: this._config.server.env
    };
  }
}