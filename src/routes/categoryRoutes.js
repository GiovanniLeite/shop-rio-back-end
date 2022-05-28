import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

import loginRequired from '../middlewares/loginRequired';
import admRequired from '../middlewares/admRequired';

const router = new Router();

router.get('/', CategoryController.index);
router.get('/name/:name', CategoryController.index);
router.post('/', loginRequired, admRequired, CategoryController.store);
router.put('/:id', loginRequired, admRequired, CategoryController.update);
router.get('/:id', CategoryController.show);
router.delete('/:id', loginRequired, admRequired, CategoryController.delete);

export default router;
