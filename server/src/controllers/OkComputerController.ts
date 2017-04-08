import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {TYPES} from '../TYPES';

@injectable()
@Controller('/okcomputer')
export class OkComputerController {

  constructor() {

  }

  @Get('/')
  public defaultCheck(): boolean {
    return true;
  }
}