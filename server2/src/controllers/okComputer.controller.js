import {Router} from 'express';

const router = new Router();

router.get('/', basicCheck);

export default router;

/**
 * The standard health check to ensure the service is running.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function basicCheck(req, res, next) {
  res.sendStatus(200);
}