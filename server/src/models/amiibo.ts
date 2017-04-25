import {IAmiiboSeries} from './AmiiboSeries';

export interface IAmiibo {
  _id: string;
  name: string;
  displayName: string;
  releaseDate: string;

  amiibo_series_id: string;
  series: IAmiiboSeries;
}

export function registerAmiiboModel(container) {
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
        displayName: {
          type: 'string',
          minLength: 1,
          maxLength: 256
        },
        releaseDate: {
          type: ['string', 'null'],
          pattern: /^\d\d\d\d-\d\d-\d\d$/
        },
        amiibo_series_id: {
          type: 'string' 
        }
      },
      required: ['name', 'displayName', 'amiibo_series_id']
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
}
