const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    optionA: {
        type: String,
        required: true,
    },
    optionB: {
        type: String,
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
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
