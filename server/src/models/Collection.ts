import {ICollectionItem} from './CollectionItem';

export interface ICollection {
  _id: string;

  items: ICollectionItem[];
}

export function registerCollectionModel(container) {
  container.defineMapper('collection', {
    idAttribute: '_id',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' }
      }
    },
    relations: {
        hasMany: {
          collectionItem: {
            foreignKey: 'collection_id',
            localField: 'items'
          }
        }
      }
  });
}