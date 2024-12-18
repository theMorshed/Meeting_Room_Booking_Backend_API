import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createRoomSchema, updateRoomSchema } from './room.validation';
import { createRoom, deleteRoom, getAllRooms, getSingleRoom, updateRoom } from './room.controller';

const router = Router();

// Route for create room
router.post('/', auth('admin'), validateRequest(createRoomSchema), createRoom);

// Roure for get single room by id
router.get('/:id', getSingleRoom);

// Roure for get all rooms
router.get('/', getAllRooms);

// Route for update room
router.patch('/:id', auth('admin'), validateRequest(updateRoomSchema), updateRoom);

// Route for delete room
router.delete('/:id', auth('admin'), deleteRoom);

export const roomRoutes = router;