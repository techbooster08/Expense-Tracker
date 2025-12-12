import {Router} from 'express';
import { createCashBook, deleteCashBook, getCashAllBooks, updateCashBook } from '../controller/cashbook.controller.js';

const router = Router();

router.get('/', getCashAllBooks);

router.post('/', createCashBook);

router.put('/:id', updateCashBook);

router.delete('/:id', deleteCashBook);

export default router;