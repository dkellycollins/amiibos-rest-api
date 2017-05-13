import {ICollection} from './Collection';

export interface ICollectionItem {
  _id: string;

  itemType: string;
  itemId: string;

  collection_id: string;
  collection: ICollection;
}

export function registerCollectionItemModel(container) {
  container.defineMapper('collectionItem', {
    idAttribute: '_id',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        itemType: {
          type: 'string'
        },
        itemId: {
          type: 'string'
        },
        collection_id: {
          type: 'string'
        }
      },
      required: ['itemType', 'itemId']
    },
    relations: {
        belongsTo: {
          collection: {
            foreignKey: 'collection_id',
            localField: 'collection'
          }
        }
      }
  });
}