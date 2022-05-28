import { Router } from 'express';
import ProductController from '../controllers/ProductController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', ProductController.index);
router.get('/name/:name', ProductController.index);
router.get('/category/:idCategory', ProductController.index);
router.post('/', loginRequired, ProductController.store);
router.put('/:id', loginRequired, ProductController.update);
router.get('/:id', ProductController.show);
router.delete('/:id', loginRequired, ProductController.delete);

export default router;
