import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createBookingSchema, updateBookingSchema } from './booking.validation';
import { createBooking, deleteBooking, getAllBookings, getUserBookings, updateBooking } from './booking.controller';

const router = Router();

// Route for create booking
router.post('/', auth('user'), validateRequest(createBookingSchema), createBooking);

// Router for get all bookings
router.get('/', auth('admin'), getAllBookings);

// Route for fetching user's bookings
router.get('/my-bookings', auth('user'), getUserBookings);

// Route for update booking
router.put('/:id', auth('admin'), validateRequest(updateBookingSchema), updateBooking);

// Route for delete booking
router.delete('/:id', auth('admin'), deleteBooking);

export const bookingRoutes = router;