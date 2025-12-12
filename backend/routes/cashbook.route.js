import {Router} from 'express';
import { createCashBook, deleteCashBook, getCashAllBooks, updateCashBook } from '../controller/cashbook.controller.js';
import { authMddleware } from '../middleware/auth.middware.js';

const router = Router();

router.use(authMddleware);

router.get('/', getCashAllBooks);

router.post('/', createCashBook);

router.put('/:id', updateCashBook);

router.delete('/:id', deleteCashBook);

export default router;