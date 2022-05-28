import { Router } from 'express';
import OrderController from '../controllers/OrderController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// default
router.get('/', loginRequired, OrderController.index);
// all orders - report
router.get('/all/:delivered', loginRequired, OrderController.indexByDelivery);
// orders by period - report
router.get(
  '/date/:start&:end&:delivered',
  loginRequired,
  OrderController.indexByDate,
);
// per user - userProfile/Cart
router.get('/user/:idUser', loginRequired, OrderController.indexByUser);

router.post('/', loginRequired, OrderController.store);
router.put('/:id', loginRequired, OrderController.update);
router.get('/:id', loginRequired, OrderController.show);
router.delete('/:id', loginRequired, OrderController.delete);

export default router;
