import {Router} from 'express';
import amiiboModel from './amiibo.model';

const router = new Router();

router.get('/', function(req, res, next) {
  return amiiboModel.findAll()
    .then((amiibos) => {
      res.json(amiibos);
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
  return amiiboModel.create(req.body)
    .then((amiibo) => {
      res.json(amiibo);
    })
    .catch(next);
});

export default router;