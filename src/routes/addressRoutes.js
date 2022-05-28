import { Router } from 'express';
import AddressController from '../controllers/AddressController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, AddressController.index);
router.post('/', loginRequired, AddressController.store);
router.put('/:id', loginRequired, AddressController.update);
router.get('/:id', loginRequired, AddressController.show);
router.delete('/:id', loginRequired, AddressController.delete);

export default router;
