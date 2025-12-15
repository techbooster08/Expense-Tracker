import {Router} from 'express';
import categoryRoute from './category.routes.js';
import { createTransaction, deleteTransaction, getTransactionsByCashbookId } from '../controller/transaction.controller.js';

const router = Router();

router.use("/category", categoryRoute);

router.post("/", createTransaction);

router.get("/:cashbookId", getTransactionsByCashbookId);

router.delete("/:id", deleteTransaction);



export default router;