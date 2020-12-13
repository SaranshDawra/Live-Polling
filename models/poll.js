const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        optionA: {
            type: String,
            required: true,
        },
        votesA: {
            type: Array,
            required: true,
        },
        optionB: {
            type: String,
            required: true,
        },
        votesB: {
            type: Array,
            required: true,
        },
        optionC: {
            type: String,
            required: true,
        },
        votesC: {
            type: Array,
            required: true,
        },
        optionD: {
            type: String,
            required: true,
        },
        votesD: {
            type: Array,
            required: true,
        },
        userId: {
            type: ObjectId,
            required: true,
        },
        votes: {
            type: Array,
            required: true,
        },
        isHalted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
