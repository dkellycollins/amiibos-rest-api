import {Router} from 'express';
import * as _ from 'lodash';
import {amiiboModel, amiiboSeriesModel} from '../models/index';
import * as amiiboSeriesService from '../services/amiiboSeries.service';

const router = new Router();

router.get('/', function(req, res, next) {
  return amiiboModel.findAll()
    .then((amiibos) => {
      res.json(amiibos);
    })
    .catch(next);
});

router.put('/', function(req, res, next) {
  const seriesNames = _.chain(req.body)
    .map('series')
    .uniq()
    .value();

  Promise.all(_.map(seriesNames, amiiboSeriesService.resolveSeriesByName))
    .then((series) => {
      const seriesByName = _.keyBy(series, 'name');
      return Promise.all(_.map(req.body, (message) => {
        const s = seriesByName[message.series];
        return amiiboModel.create({
          name: message.name,
          releaseDate: message.releaseDate,
          amiibo_series_id: s._id
        });  
      }));
    })
    .then((amiibos) => {
      res.json(amiibos);
    })
    .catch(next);
});

export default router;