import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../types';
import {IConfig} from '../config';
import {Sequelize} from 'sequelize';
import {Umzug} from 'umzug';
import * as passport from 'passport';

@injectable()
@Controller('/okcomputer')
export class OkComputerController {

  constructor(
    @inject(TYPES.Config) private _config: IConfig,
    @inject(TYPES.Models.DataStore) private _sql: Sequelize) {

  }

  @Get('/', passport.authenticate('localapikey', {session: false}))
  public defaultCheck(): boolean {
    return true;
  }

  @Get('/env', passport.authenticate('localapikey', {session: false}))
  public envCheck(): any {
    return {
      env: this._config.server.env
    };
  }

  @Get('/sql', passport.authenticate('localapikey', {session: false}))
  public async sqlCheck(): Promise<boolean> {
    await this._sql.authenticate();
    return true;
  }
}
