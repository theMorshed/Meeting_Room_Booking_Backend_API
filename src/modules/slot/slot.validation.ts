import { z } from 'zod';

// Create slot validation schema
export const createSlotSchema = z.object({
    // Room validation: Ensure the room ID is a valid MongoDB ObjectId
    room: z.string({required_error: 'Room ID must be a valid ObjectId'}),

    // Date validation: Check if the date is a valid date string
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),

    // Start time validation: Check if the start time is in the correct HH:mm format
    startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 'Invalid start time format (HH:mm)'),

    // End time validation: Check if the end time is in the correct HH:mm format
    endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 'Invalid end time format (HH:mm)'),
    }).refine(data => {
        // Convert the date, startTime, and endTime into Date objects
        const start = new Date(`${data.date}T${data.startTime}:00`);
        const end = new Date(`${data.date}T${data.endTime}:00`);

        // Ensure the start time is before the end time
        return start < end;
    }, 
    {
        message: 'Start time must be before end time',
    }
);

