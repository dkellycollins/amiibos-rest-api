export var CollectionMapper = {
    name: 'collection',
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
};