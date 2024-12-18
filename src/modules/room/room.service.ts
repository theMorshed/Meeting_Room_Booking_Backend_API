import Room from "./room.model";
import { TRoom } from "./room.types";

export const createRoomService = async(payload: TRoom) => {
    const result = await Room.create(payload);
    return result;
}

export const getSingleRoomService = async(id: string) => {
    const result = await Room.findById(id);
    return result;
}

export const getAllRoomsService = async() => {
    const result = await Room.find({});
    return result;
}

export const updateRoomService = async(id: string, payload: Partial<TRoom>) => {
    const result = await Room.findByIdAndUpdate(id, payload, {new: true});
    return result;
}

export const deleteRoomService = async(id: string) => {
    const result = await Room.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
    return result;
}