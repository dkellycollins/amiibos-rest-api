import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../types';
import {IConfig} from '../config';
import {MongoClient} from 'mongodb';
import {RedisClient} from 'redis';

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

  @Get('/mongo')
  public async mongoCheck(): Promise<any> {
    return MongoClient.connect(this._config.mongo.uri)
      .then(db => db.stats());
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
}