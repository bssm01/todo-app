import express from 'express';
import { register, login , resetPassword , forgetPassword} from '../controllers/authContol.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgetPassword);

export default router;