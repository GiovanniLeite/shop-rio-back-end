import { Router } from 'express';

import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';
import admRequired from '../middlewares/admRequired';

const router = new Router();

router.get('/', loginRequired, UserController.index);
router.get('/name/:name', loginRequired, UserController.index);

router.get('/:id', loginRequired, admRequired, UserController.show);

router.post('/', UserController.store); // normal user creation
router.post('/adm/', loginRequired, admRequired, UserController.store); // adm creation

router.put(
  '/adm/:id&:isCartCodeUpdate',
  loginRequired,
  admRequired,
  UserController.update,
);
router.put('/adm/:id', loginRequired, admRequired, UserController.update);
router.put('/:id', loginRequired, UserController.update);

router.delete('/:id', loginRequired, UserController.delete);

export default router;
