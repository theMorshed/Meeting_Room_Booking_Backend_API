import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createUserSchema, loginSchema } from './user.validation';
import { login, signup } from './user.controller';

const router = Router();

// Route for user signup
router.post('/signup', validateRequest(createUserSchema), signup);

// Route for user login
router.post('/login', validateRequest(loginSchema), login);

export const userRoutes = router;
