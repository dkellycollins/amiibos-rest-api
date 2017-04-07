import {Router} from 'express';
import * as _ from 'lodash';
import {amiiboSeriesModel} from '../models';

const router = new Router();

router.get('/:id', retrieve);
router.get('/', search);
router.delete('/:id', remove);

export default router;

function search(req, res, next) {
  amiiboSeriesModel.findAll(req.query)
    .then((series) => res.json(series))
    .catch(next);
}

function retrieve(req, res, next) {
  amiiboSeriesModel.find(req.params.id)
    .then((series) => res.json(series))
    .catch(next);
}

function remove(req, res, next) {
  amiiboSeriesModel.destroy(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
}