const express = require("express");
const Poll = require("../models/poll");
const Vote = require("../models/vote");
const router = express();

router.get("/:qid", async (req, res) => {
    const qid = req.params.qid;
    try {
        let poll = await Vote.find({ questionId: qid });
        if (poll.length === 0 || !poll) {
            return res.status(404).send("No Poll Found");
        }
        return res.send(poll);
    } catch (err) {
        return res.status(500).send("Something went wrong, try again later");
    }
});

router.put("/:qid", async (req, res) => {
    const qid = req.params.qid;
    try {
        let vote = await Vote.findOne({ questionId: qid });
        if (!vote) {
            return res.status(404).send("No Poll Found");
        }

        const { option, userId } = req.body;

        const poll = await Poll.findById(qid);

        if (poll.votes.includes(userId)) {
            return res.send("You have already voted!");
        }

        if (option === 0 && !vote.optionA.includes(userId)) {
            vote.optionA.push(userId);
            vote = await vote.save();
        } else if (option === 1 && !vote.optionB.includes(userId)) {
            vote.optionB.push(userId);
            vote = await vote.save();
        }

        poll.votes.push(userId);
        await poll.save();

        return res.send(vote);
    } catch (err) {
        return res.status(500).send("Something went wrong, try again later");
    }
});

module.exports = router;
