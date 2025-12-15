import {Router} from 'express';
import { createCashBook, deleteCashBook, getCashAllBooks, toggleArchive, toggleFavorite, updateCashBook } from '../controller/cashbook.controller.js';

const router = Router();

router.get('/', getCashAllBooks);

router.post('/', createCashBook);

router.put('/:id', updateCashBook);

router.delete('/:id', deleteCashBook);

router.patch('/:id/favorite', toggleFavorite);

router.patch('/:id/archive', toggleArchive);


export default router;