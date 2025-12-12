import {Router} from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import cashbookRoutes from './cashbook.routes.js';   
import transactionRoutes from "./transaction.route.js"
import { authMddleware } from '../middleware/auth.middware.js';
const router = Router();

// public routed
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

// middleware for route protection
router.use(authMddleware);

router.use('/cashbook', cashbookRoutes);
router.use("/transaction", transactionRoutes);


export default router;