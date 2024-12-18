import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { createRoomService, deleteRoomService, getAllRoomsService, getSingleRoomService, updateRoomService } from './room.service';

export const createRoom = catchAsync(async (req, res) => {
    const room = await createRoomService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Room added successfully',
        data: room
    })
});

export const getSingleRoom = catchAsync(async (req, res) => {
    const room = await getSingleRoomService(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Room retrieved successfully',
        data: room
    })
});

export const getAllRooms = catchAsync(async (req, res) => {
    const room = await getAllRoomsService();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Room retrieved successfully',
        data: room
    })
});

export const updateRoom = catchAsync(async (req, res) => {
    const room = await updateRoomService(req.params.id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Room updated successfully',
        data: room
    })
});

export const deleteRoom = catchAsync(async (req, res) => {
    const room = await deleteRoomService(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Room deleted successfully',
        data: room
    })
});
