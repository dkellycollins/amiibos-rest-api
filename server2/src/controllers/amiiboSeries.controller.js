import {Router} from 'express';
import * as _ from 'lodash';
import {amiiboSeriesModel} from '../models';

const router = new Router();

router.get('/', function(req, res, next) {
  amiiboSeriesModel.findAll(req.query)
    .then((series) => {
      res.json(series);
    })
    .catch(next);
});

export default router;