import {IAmiibo} from './Amiibo';

export interface IAmiiboSeries {
  _id: string;
  name: string;

  amiibos: IAmiibo[];
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
          maxLength: 256,
          uniqueItems: true 
        },
        displayName: {
          type: 'string',
          minLength: 1,
          maxLength: 256
        }
      },
      required: ['name', 'displayName']
    },
    relations: {
      hasMany: {
        amiibo: {
          foreignKey: 'amiibo_series_id',
          localField: 'series'
        }
      }
    },
    /*
    methods: {
      beforeDestory: function(id, opts) {
        //TODO: Doesn't work.
        return container.destroyAll('amiibo', {amiibo_series_id: id});
      }
    }
    */
  });
}