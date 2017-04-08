
export interface IAmiiboSeries {
  _id: string;
  name: string;
}

export function registerAmiiboSeriesModel(container) {
  container.defineMapper('amiiboSeries', {
    idAttribute: '_id',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { 
          type: 'string',
          minLength: 1,
          maxLength: 256 
        }
      },
      required: ['name']
    },
    relations: {
      hasMany: {
        amiibo: {
          foreignKey: 'amiibo_series_id',
          localField: 'series'
        }
      }
    },
    methods: {
      beforeDestory: function(id, opts) {
        //TODO: Doesn't work.
        return amiiboModel.destroyAll({amiibo_series_id: id});
      }
    }
  });
}