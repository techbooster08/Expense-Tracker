import {Router} from 'express';

const router = Router();

router.post('/login', (req, res)=>{
    res.send('login successfull');
});

router.post('/register', (req, res)=>{
    res.send('register successfull');
});

export default router;