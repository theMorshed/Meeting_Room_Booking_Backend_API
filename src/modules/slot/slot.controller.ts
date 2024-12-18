import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { createSlotService, getAvailableSlotsService } from './slot.service';
import sendResponse from '../../utils/sendResponse';


export const createSlots = catchAsync(async (req, res) => {
    const slots = await createSlotService(req.body);

    // Respond with the created slots
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Slots created successfully',
        data: slots
    })
});

export const getAvailableSlots = catchAsync(async (req, res) => {
    const { date, roomId } = req.query;

    // Call the service to get the available slots
    const slots = await getAvailableSlotsService(date as string, roomId as string);

    // Respond with the available slots
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Available slots retrieved successfully',
        data: slots
    });
});
