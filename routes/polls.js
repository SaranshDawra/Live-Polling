const express = require("express");
const Poll = require("../models/poll");
const User = require("../models/user");
const router = express();

router.get("/", async (req, res) => {
    try {
        const polls = await Poll.find().select("-userId");
        return res.send(polls);
    } catch (err) {
        return res.status(500).send("Something went wrong, try again later.");
    }
});

router.get("/:uid", async (req, res) => {
    const uid = req.params.uid;
    try {
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).send("User Not Found");
        }
        const polls = await Poll.find({ userId: uid });
        return res.send(polls);
    } catch (err) {
        return res.status(500).send("Something went wrong, try again later.");
    }
});

router.post("/", async (req, res) => {
    let poll = new Poll({
        question: req.body.question,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        votes: req.body.votes,
        userId: req.body.userId,
    });

    try {
        poll = await poll.save();
        return res.status(200).send(poll);
    } catch (err) {
        return res
            .status(404)
            .send("Something went wrong, check your inputs or try again later");
    }
});

router.put("/:qid", async (req, res) => {
    const qid = req.params.qid;
    try {
        let poll = await Poll.findById(qid);
        if (!poll) {
            return res.status(404).send("No Poll Exists");
        }
        if(poll.votes.includes(req.body.userId)) {
            return res.send('Already voted');
        }
        poll.votes.push(req.body.userId);
        poll = await poll.save();
        return res.send(poll);
    } catch (err) {
        return res.status(400).send("Something went wrong, try again later.");
    }
});

module.exports = router;
