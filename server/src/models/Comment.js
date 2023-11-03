import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { name: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: { name: Schema.Types.ObjectId, required: true, ref: 'Account' },
    body: { type: String, required: true, maxLength: 500 },
    isAttending: { type: Boolean, required: false, default: false }
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

CommentSchema.virtual('Account', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})