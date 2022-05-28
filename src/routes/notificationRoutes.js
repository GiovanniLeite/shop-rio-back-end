import { Router } from 'express';
import NotificationController from '../controllers/NotificationController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, NotificationController.index);
router.get('/user/:idUser', loginRequired, NotificationController.index);
router.post('/', loginRequired, NotificationController.store);
router.put('/:id', loginRequired, NotificationController.update);
router.get('/:id', loginRequired, NotificationController.show);
router.delete('/:id', loginRequired, NotificationController.delete);

export default router;
