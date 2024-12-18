import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Slot } from "./slot.model";
import { TSlot } from "./slot.types";

// Helper function to convert time string to minutes since midnight
const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    // Pad with leading zeros to maintain "HH:mm" format
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const createSlotService = async (payload: Partial<TSlot>) => {
    const { room, date, startTime, endTime } = payload;

    // Slot duration in minutes (can be dynamic or from DB)
    const slotDuration = 60;

    // Convert start and end time to minutes since midnight
    const startMinutes = timeToMinutes(startTime!);
    const endMinutes = timeToMinutes(endTime!);

    // Calculate total duration in minutes
    const totalDuration = endMinutes - startMinutes;

    // Calculate the number of slots
    const numberOfSlots = totalDuration / slotDuration;

    if (numberOfSlots <= 0) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'End time must be later than start time');
    }

    const slots: any[] = [];

    // Generate slots with start and end times
    for (let i = 0; i < numberOfSlots; i++) {
        const currentSlotStartMinutes = startMinutes + i * slotDuration;
        const currentSlotEndMinutes = currentSlotStartMinutes + slotDuration;

        const startTimeFormatted = minutesToTime(currentSlotStartMinutes);
        const endTimeFormatted = minutesToTime(currentSlotEndMinutes);

        // Push the slot into the slots array
        slots.push({
            room,
            date: new Date(date!),
            startTime: startTimeFormatted,
            endTime: endTimeFormatted,
            isBooked: false,
        });
    }

    // Save the slots to the database
    const createdSlots = await Slot.insertMany(slots);

    return createdSlots;
};

export const getAvailableSlotsService = async (date: string, roomId: string) => {
    let filter: any = { isBooked: false };

    // If date is provided, filter by the specific date
    if (date) {
        filter.date = new Date(date);  // Ensure the date is a valid Date object
    }

    // If roomId is provided, filter by the specific room
    if (roomId) {
        filter.room = roomId;
    }

    // Fetch available slots from the database
    const availableSlots = await Slot.find(filter).populate('room', 'name roomNo floorNo capacity pricePerSlot amenities isDeleted');

    return availableSlots;
};