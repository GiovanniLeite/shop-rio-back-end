import { Router } from 'express';
import PictureController from '../controllers/PictureController';

import loginRequired from '../middlewares/loginRequired';
import admRequired from '../middlewares/admRequired';

const router = new Router();

router.post('/', loginRequired, PictureController.store);
router.delete('/:id', loginRequired, admRequired, PictureController.delete);

export default router;
