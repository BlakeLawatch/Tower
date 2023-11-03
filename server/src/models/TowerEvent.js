import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, maxLength: 500 },
    description: { type: String, required: true, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 500 },
    location: { type: String, required: true, maxLength: 100 },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: false, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true },
},
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    ref: 'Ticket',
    foreignField: 'eventId',
    count: true
})
