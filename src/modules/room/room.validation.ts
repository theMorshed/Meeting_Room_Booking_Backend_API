import { z } from 'zod';

export const createRoomSchema = z.object({
    name: z.string({ required_error: 'Room name is required' }).min(1, 'Room name cannot be empty').trim(),
    roomNo: z.number({ required_error: 'Room number is required', invalid_type_error: 'Room number must be a number' }).int().positive('Room number must be a positive number'),
    floorNo: z.number({ required_error: 'Floor number is required', invalid_type_error: 'Floor number must be a number' }).int().positive('Floor number must be a positive number'),
    capacity: z.number({ required_error: 'Capacity is required', invalid_type_error: 'Capacity must be a number' }).int().positive('Capacity must be at least 1'),
    pricePerSlot: z.number({ required_error: 'Price per slot is required', invalid_type_error: 'Price per slot must be a number' }).nonnegative('Price per slot cannot be negative'),
    amenities: z.array(z.string().min(1, 'Amenity cannot be empty'), { invalid_type_error: 'Amenities must be an array of strings' }).optional(),
    isDeleted: z.boolean().optional().default(false),
});

export const updateRoomSchema = createRoomSchema.partial();
