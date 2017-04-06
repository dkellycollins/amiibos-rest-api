
export default function amiiboModelFactory(container) {
  container.defineMapper('amiibo', {
    idAttribute: '_id',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { 
          type: 'string',
          minLength: 1,
          maxLength: 256,
          indexed: true 
        },
        releaseDate: {
          type: ['string', 'null'],
          pattern: /^\d\d\d\d-\d\d-\d\d$/
        },
        amiibo_series_id: {
          type: 'string' 
        }
      },
      required: ['name', 'amiibo_series_id']
    },
    relations: {
        belongsTo: {
          amiiboSeries: {
            foreignKey: 'amiibo_series_id',
            localField: 'series'
          }
        }
      }
  });

  return container.as('amiibo');
}