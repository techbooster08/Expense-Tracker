import {Router} from 'express';
import { createCashBook, getCashAllBooks } from '../controller/cashbook.controller.js';
import { authMddleware } from '../middleware/auth.middware.js';

const router = Router();

router.use(authMddleware);

router.post('/create', createCashBook);

router.get('/all', getCashAllBooks);

export default router;