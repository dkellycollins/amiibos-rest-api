import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../types';
import {IConfig} from '../config';
import {RedisClient} from 'redis';
import {Sequelize} from 'Sequelize';

@injectable()
@Controller('/okcomputer')
export class OkComputerController {

  constructor(
    @inject(TYPES.Config) private _config: IConfig,
    @inject(TYPES.Models.DataStore) private _sql: Sequelize) {

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

  @Get('/redis')
  public async redisCheck(): Promise<any> {
    return new Promise((resolve, reject) => {
      const client = new RedisClient(this._config.redis);
      client.info((err, result) => {
        if(!!err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    }); 
  }

  @Get('/sql')
  public async sqlCheck(): Promise<boolean> {
    await this._sql.authenticate();
    return true;
  }
}