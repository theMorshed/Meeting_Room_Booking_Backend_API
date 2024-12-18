// Room Type Definition
export type TRoom = {
    name: string; // Name of the meeting room
    roomNo: number; // Unique room number
    floorNo: number; // Floor level where the room is located
    capacity: number; // Maximum capacity of the room
    pricePerSlot: number; // Price per individual slot
    amenities: string[]; // Array of amenities (e.g., "Projector", "Whiteboard")
    isDeleted: boolean; // Indicates whether the room is marked as deleted
};
