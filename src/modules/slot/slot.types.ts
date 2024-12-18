import { Types } from 'mongoose';

export type TSlot = {
    room: Types.ObjectId; // Reference to the Room model
    date: Date; // Date of the booking
    startTime: string; // Start time of the slot (ISO or formatted time string)
    endTime: string; // End time of the slot (ISO or formatted time string)
    isBooked: boolean; // Booking status (false means not booked)
};
