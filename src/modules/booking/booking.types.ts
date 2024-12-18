import { ObjectId } from 'mongoose';  // Assuming you're using Mongoose for ObjectId

// Booking Status Enum
export enum BookingStatus {
    CONFIRMED = 'confirmed',
    UNCONFIRMED = 'unconfirmed',
    CANCELED = 'canceled'
}

// Booking Type
export type TBooking = {
    room: ObjectId;           // Reference to the room model
    slots: ObjectId[];        // Array of slot IDs (references to slot model)
    user: ObjectId;           // Reference to the user model
    date: Date;               // Date of the booking
    totalAmount: number;      // Total amount for the booking
    isConfirmed: BookingStatus;  // Booking status (confirmed, unconfirmed, or canceled)
    isDeleted: boolean;       // Indicates if the booking is deleted (false = not deleted)
}
