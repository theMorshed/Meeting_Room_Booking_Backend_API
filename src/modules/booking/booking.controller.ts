import { StatusCodes } from 'http-status-codes'; // For status codes
import catchAsync from '../../utils/catchAsync';
import { createBookingService, deleteBookingService, getAllBookingsService, getUserBookingsService, updateBookingService } from './booking.service';
import sendResponse from '../../utils/sendResponse';

export const createBooking = catchAsync(async (req, res) => {
    // Call the service to create the booking
    const booking = await createBookingService(req.body);

    // Send response with the created booking
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Booking created successfully',
        data: booking,
    });
});

export const getAllBookings = catchAsync(async (req, res) => {
    const bookings = await getAllBookingsService();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'All Bookings retrieved successfully',
        data: bookings
    })
});

export const getUserBookings = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const bookings = await getUserBookingsService(userId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User bookings retrieved successfully',
        data: bookings,
    });
});

export const updateBooking = catchAsync(async (req, res) => {
    const id = req.params.id;
    const booking = await updateBookingService(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Booking updated successfully',
        data: booking,
    });
});

export const deleteBooking = catchAsync(async (req, res) => {
    const id = req.params.id;
    const booking = await deleteBookingService(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Booking deleted successfully',
        data: booking,
    });
});
