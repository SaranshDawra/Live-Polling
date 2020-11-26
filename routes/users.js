const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const router = express();

router.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post(
    "/signup",
    [
        check("username", "USERNAME should be unique and should have atleast 3 characters ").notEmpty().isLength({ min: 3 }),
        check("email", "EMAIL should be unique").normalizeEmail().isEmail(),
        check("password", "PASSWORD too short").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if(errors.array().length === 1) {
                return res
                .status(404)
                .send(errors.array()[0].msg);
            } else {
                return res
                .status(404)
                .send("Invalid inputs passed, please check your data");
            }
        }

        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        try {
            user = await user.save();
            res.send(user);
        } catch (err) {
            return res.send('USERNAME and EMAIL should be unique');
        }
    }
);

module.exports = router;
