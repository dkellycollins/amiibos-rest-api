import {amiiboSeriesModel} from '../models/index';

export function resolveSeriesByName(name) {
  return amiiboSeriesModel.findAll({name: name})
    .then((series) => {
      if(!series || series.length === 0) {
        return amiiboSeriesModel.create({
          name: name
        });
      }

      return series[0];
    });
}