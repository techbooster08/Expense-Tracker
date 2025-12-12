import {Router} from 'express';
import categoryRoute from './category.routes.js';
import { createTransaction } from '../controller/transaction.controller.js';

const router = Router();

router.use("/category", categoryRoute);

router.post("/", createTransaction);

export default router;