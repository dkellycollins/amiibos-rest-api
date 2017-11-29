import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../types';
import {IConfig} from '../config';
import {Sequelize} from 'sequelize';
import { AuthenticateLocalApiKey } from '../authentication/index';

@injectable()
@Controller('/status')
export class StatusController {

  constructor(
    @inject(TYPES.Config) private _config: IConfig,
    @inject(TYPES.Models.DataStore) private _sql: Sequelize) {

  }

  @Get('/')
  public defaultCheck(): boolean {
    return true;
  }

  @Get('/info', AuthenticateLocalApiKey)
  public versionCheck(): any {
    const p = require('../../package.json');
    return {
      version: p.version,
      env: this._config.server.env
    };
  }

  @Get('/sql', AuthenticateLocalApiKey)
  public async sqlCheck(): Promise<boolean> {
    await this._sql.authenticate();
    return true;
  }
}
