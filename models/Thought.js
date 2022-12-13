const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const TSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minLength: 1, maxLength: 280,},
        createdAt: { type: Date, default: Date.now()},
        username: { type: String, required: true},
        reactions : [reaction], 
    },
    {
        toJSON: { virtuals: true,},
        id: false,
    }
);

TSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', TSchema);

module.exports = Thought;