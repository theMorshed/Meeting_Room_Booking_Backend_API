import mongoose, { Schema, Document, model } from 'mongoose';
import { BookingStatus, TBooking } from './booking.types';

const BookingSchema: Schema = new Schema<TBooking>({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.UNCONFIRMED },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

// Custom toJSON method to exclude __v and timestamps in the response
BookingSchema.set('toJSON', {
    transform: (doc, ret) => {
        // Delete the fields you don't want in the response
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

const Booking = model<TBooking>('Booking', BookingSchema);

export default Booking;
