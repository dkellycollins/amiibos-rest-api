import {Router} from 'express';
import amiiboModel from './amiibo.model';

const router = new Router();

router.get('/', function(req, res, next) {
  return amiiboModel.findAll();
});

router.post('/', function(req, res, next) {
  return amiiboModel.create(req.body);
});

export default router;