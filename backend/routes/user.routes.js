import {Router} from 'express';
import { getUser } from '../controller/user.controller.js';

const router = Router();

router.get('/verify', getUser);

export default router;