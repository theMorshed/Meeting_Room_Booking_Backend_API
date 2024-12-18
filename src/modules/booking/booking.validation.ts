import { z } from 'zod';

// Define a Zod schema for validating ObjectId (length 24 hex characters)
const ObjectIdSchema = z.string().length(24, 'Invalid ObjectId format');

// Define the Zod validation schema for the booking request
export const createBookingSchema = z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }), // Validate the date format
    slots: z.array(ObjectIdSchema, { 
        required_error: 'Slots are required' 
    }).min(1, 'At least one slot must be selected'), // Validate that at least one slot is provided
    room: ObjectIdSchema, // Validate room ID as a valid ObjectId
    user: ObjectIdSchema, // Validate user ID as a valid ObjectId
});

export const updateBookingSchema = createBookingSchema.partial();
