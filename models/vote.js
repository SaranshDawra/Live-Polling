const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.ObjectId,
        required: true,
    },
    optionA: {
        type: Array,
        required: true,
    },
    optionB: {
        type: Array,
        required: true,
    },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
