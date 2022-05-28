import { Router } from 'express';
import WishlistController from '../controllers/WishlistController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, WishlistController.index);
router.get('/user/:idUser', loginRequired, WishlistController.index);
router.post('/', loginRequired, WishlistController.store);
router.put('/:id', loginRequired, WishlistController.update);
router.get('/:id', loginRequired, WishlistController.show);
router.delete('/:id', loginRequired, WishlistController.delete);

export default router;
