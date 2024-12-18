import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createSlots, getAvailableSlots } from './slot.controller';
import { createSlotSchema } from './slot.validation';

const router = Router();

// Route for create slots
router.post('/', auth('admin'), validateRequest(createSlotSchema), createSlots);

// GET /api/slots/availability
router.get('/availability', getAvailableSlots);

export const slotRoutes = router;