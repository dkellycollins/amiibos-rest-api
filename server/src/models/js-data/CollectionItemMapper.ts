export const CollectionItemMapper = {
  name: 'collectionItem',
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
};