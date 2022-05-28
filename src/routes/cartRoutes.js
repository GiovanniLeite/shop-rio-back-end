import { Router } from 'express';
import CartController from '../controllers/CartController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, CartController.index);
router.get('/user/:idUser&:cartCode', loginRequired, CartController.index);
router.post('/', loginRequired, CartController.store);
router.put('/:id', loginRequired, CartController.update);
router.get('/:id', loginRequired, CartController.show);
router.delete('/:id', loginRequired, CartController.delete);

export default router;
