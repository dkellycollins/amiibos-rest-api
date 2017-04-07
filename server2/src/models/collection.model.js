
export default function collectionModelFactory(container) {
  container.defineMapper('collection', {
    idAttribute: '_id',
    schema: {
      type: 'object',
      properties: {
        amiibo_ids: {
          type: 'array'
        }
      }
    },
    relations: {
      hasMany: {
        amiibo: {
          localKeys: 'amiibo_ids',
          localField: 'amiibos'
        }
      }
    }
  });

  return container.as('collection');
}