import { model, Schema } from "mongoose";
import { TSlot } from "./slot.types";

const SlotSchema = new Schema<TSlot>(
    {
        room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isBooked: { type: Boolean, default: false },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
        versionKey: false, // Removes __v
    }
);

// Custom toJSON method to exclude __v and timestamps in the response
SlotSchema.set('toJSON', {
    transform: (doc, ret) => {
        // Delete the fields you don't want in the response
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

export const Slot = model<TSlot>('Slot', SlotSchema);