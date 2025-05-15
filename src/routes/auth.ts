import {Router} from 'express';
import { register, signIn } from '../controllers/authController';
import {validateRegister, validateSignIn} from '../middleware/validate';
import asyncHandler from 'express-async-handler';

const router = Router();

// Register route
router.post('/register', validateRegister, asyncHandler(register));

// Signin route
router.post('/signin', validateSignIn, asyncHandler(signIn));



export default router;
