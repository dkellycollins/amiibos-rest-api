import {Router} from 'express';
import * as _ from 'lodash';
import {amiiboSeriesModel} from '../models';

const router = new Router();

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);

  amiiboSeriesModel.find(req.params.id)
    .then((series) => {
      res.json(series);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
  amiiboSeriesModel.findAll(req.query)
    .then((series) => {
      res.json(series);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  amiiboSeriesModel.destroy(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

export default router;