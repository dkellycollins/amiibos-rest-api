import {Router} from 'express';
import * as _ from 'lodash';
import {amiiboModel, amiiboSeriesModel} from '../models/index';
import * as amiiboSeriesService from '../services/amiiboSeries.service';

const router = new Router();

router.get('/:id', retrieve);
router.get('/', search);
router.put('/:id', update);
router.put('/', create);
router.delete('/:id', remove);

export default router;

function search(req, res, next) {
  amiiboModel.findAll()
    .then((amiibos) => res.json(amiibos))
    .catch(next);
}

function retrieve(req, res, next) {
  amiiboModel.find(req.params.id)
    .then((amiibo) => res.json(amiibo))
    .catch(next);
}

function create(req, res, next) {
  const seriesNames = _.chain(req.body)
    .map('series')
    .uniq()
    .value();

  Promise.all(_.map(seriesNames, amiiboSeriesService.resolveSeriesByName))
    .then((series) => {
      const seriesByName = _.keyBy(series, 'name');
      const models = _.map(req.body, (message) => {
        return {
          name: message.name,
          releaseDate: message.releaseDate,
          amiibo_series_id: seriesByName[message.series]._id
        };
      });

      return amiiboModel.createMany(models);
    })
    .then((amiibos) => res.json(amiibos))
    .catch(next);
}

function update(req, res, next) {

}

function remove(req, res, next) {
  amiiboModel.destroy(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
}