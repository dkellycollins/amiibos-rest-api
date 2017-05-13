import * as _ from 'lodash';
import {injectable, inject} from 'inversify';
import {Controller, Get, Post, Put, Delete} from 'inversify-express-utils';
import {Request} from 'express';
import {IAmiibo, ICollection} from '../models';
import {IAmiiboManager, ICollectionManager} from '../managers';
import {TYPES} from '../types';

@injectable()
@Controller('/collections')
export class CollectionsController {

  constructor(
    @inject(TYPES.Managers.CollectionManager) private _collectionManager: ICollectionManager) {

  }

  @Post('/')
  public async create(req: Request): Promise<ICollection> {
    return await this._collectionManager.create(req.body);
  }

  @Get('/:id')
  public async fetch(req: Request): Promise<ICollection> {
    return await this._collectionManager.fetch(req.params.id);
  }

  @Delete('/:id')
  public async remove(req: Request): Promise<ICollection> {
    return await this._collectionManager.remove(req.params.id)
  }

  @Get('/:id/amiibos')
  public async getAmiibos(req: Request): Promise<IAmiibo[]> {
    return Promise.reject('Not Implemented');
  }

  @Put('/:id/amiibos')
  public async saveAmiibos(req: Request): Promise<ICollection> {
    const infos = _.map(req.body, (amiiboId: string) => {
      return {
        itemType: 'amiibo',
        itemId: amiiboId
      };
    });

    return await this._collectionManager.saveItems(req.params.id, infos);
  }
}