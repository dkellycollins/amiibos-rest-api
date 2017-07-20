import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../types';
import {IConfig} from '../config';
import {Sequelize} from 'sequelize';
import {Umzug} from 'umzug';

@injectable()
@Controller('/okcomputer')
export class OkComputerController {

  constructor(
    @inject(TYPES.Config) private _config: IConfig,
    @inject(TYPES.Models.DataStore) private _sql: Sequelize,
    @inject(TYPES.Models.Migrator) private _migrator: Umzug) {

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

  @Get('/sql')
  public async sqlCheck(): Promise<boolean> {
    await this._sql.authenticate();
    return true;
  }

  @Get('/sql/migrations/executed')
  public async getExecutedMigrations(): Promise<string[]> {
    const executedMigrations = await this._migrator.executed();
    return _.map(executedMigrations, (migration) => migration.file);
  }
}