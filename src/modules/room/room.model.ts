import { model, Schema } from "mongoose";
import { TRoom } from "./room.types";

// Define the Room Schema
const RoomSchema = new Schema<TRoom>(
    {
        name: { type: String, required: true, trim: true },
        roomNo: { type: Number, required: true, unique: true },
        floorNo: { type: Number, required: true },
        capacity: { type: Number, required: true, min: 1 }, // Minimum capacity of 1
        pricePerSlot: { type: Number, required: true, min: 0 }, // Non-negative cost
        amenities: { type: [String], required: true }, // Array of strings for amenities
        isDeleted: { type: Boolean, default: false }, // Soft delete flag with default false
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false, // Removes the __v field
    }
);

// Custom toJSON method to exclude __v and timestamps in the response
RoomSchema.set('toJSON', {
    transform: (doc, ret) => {
        // Delete the fields you don't want in the response
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

// Create and export the Room model
const Room = model<TRoom>('Room', RoomSchema);

export default Room;