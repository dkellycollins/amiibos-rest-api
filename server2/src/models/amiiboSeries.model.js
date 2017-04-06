
export default function amiiboSeriesModelFactory(container) {
  container.defineMapper('amiiboSeries', {
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { 
          type: 'string',
          minLength: 1,
          maxLength: 256 
        }
      }
    },
    relations: {
      hasMany: {
        amiibo: {
          foreignKey: 'amiibo_series_id',
          localField: 'series'
        }
      }
    }
  });

  return container.as('amiiboSeries');
}