import {Router} from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import cashbookRoutes from './cashbook.route.js';   

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/cashbook', cashbookRoutes);


export default router;