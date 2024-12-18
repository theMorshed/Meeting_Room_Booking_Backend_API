import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Room from "../room/room.model";
import { Slot } from "../slot/slot.model";
import User from "../user/user.model";
import Booking from "./booking.model";
import { BookingStatus, TBooking } from "./booking.types";

export const createBookingService = async (payload: TBooking): Promise<TBooking> => {
    // Destructure request body
    const { date, slots, room: roomId, user: userId } = payload;

    // 1. Fetch the room details
    const room = await Room.findById(roomId);
    if (!room) {
        throw new Error('Room not found');
    }

    // Step 1: Retrieve all the slots by their IDs
    const slotsToCheck = await Slot.find({ '_id': { $in: slots } });

    // Step 2: Check if any of the slots are already booked
    const unavailableSlots = slotsToCheck.filter(slot => slot.isBooked || (slot.date.toISOString().split('T')[0] !== new Date(date).toISOString().split('T')[0]));

    if (unavailableSlots.length > 0) {
        // If any slot is already booked, throw an error
        throw new AppError(StatusCodes.BAD_REQUEST, 'One or more selected slots are not exists or already booked.');
    }

    // 2. Fetch the slots to check availability and update them
    const selectedSlots = await Slot.find({ '_id': { $in: slots }, 'isBooked': false });
    if (selectedSlots.length !== slots.length) {
        throw new Error('Some slots are already booked or invalid');
    }

    // 3. Fetch the user details
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // 4. Calculate the total amount based on price per slot
    const totalAmount = selectedSlots.length * room.pricePerSlot;

    // 5. Mark the selected slots as booked
    await Slot.updateMany(
        { '_id': { $in: slots } },
        { $set: { isBooked: true } }
    );

    const updatedSlots = await Slot.find({ '_id': { $in: slots } });

    // 6. Create the booking
    const booking = await Booking.create({
        date,
        slots: updatedSlots,
        room: roomId,
        user: userId,
        totalAmount,
        isConfirmed: BookingStatus.UNCONFIRMED,
        isDeleted: false,
    });

    // 7. Return the created booking
    return booking;
};

export const getAllBookingsService = async() => {
    const booking = await Booking.find({});
    return booking;
}

export const getUserBookingsService = async (userId: string) => {
    // Fetch bookings for the authenticated user, populating slots and room details
    const bookings = await Booking.find({ user: userId, isDeleted: false })
        .populate({
            path: 'slots',
            select: '_id room date startTime endTime isBooked',
        })
        .populate({
            path: 'room',
            select: '_id name roomNo floorNo capacity pricePerSlot amenities isDeleted',
        })
        .select('_id date slots room totalAmount isConfirmed isDeleted');

    return bookings;
};

export const updateBookingService = async (id: string, payload: Partial<TBooking>) => {
    const booking = await Booking.findByIdAndUpdate(id, payload, {new: true});
    return booking;
}

export const deleteBookingService = async (id: string) => {
    const isBookingDeleted = await Booking.findById(id);
    if (isBookingDeleted?.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'This booking is already deleted by admin');
    }

    const booking = await Booking.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
    return booking;booking
}
