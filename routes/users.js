const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const router = express();

router.get("/:username", async (req, res) => {
    try {
        const users = await User.findOne({
            username: req.params.username,
        }).select("-password");

        if (!users) {
            return res.send({ found: false, msg: "User not found" });
        }
        res.send(users);
    } catch (err) {
        return res.status(500).send('Something went wrong, try again later');
    }
});

router.post(
    "/signup",
    [
        check(
            "username",
            "USERNAME should be unique and should have atleast 3 characters "
        )
            .notEmpty()
            .isLength({ min: 3 }),
        check("email", "EMAIL should be unique").normalizeEmail().isEmail(),
        check("password", "PASSWORD too short").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (errors.array().length === 1) {
                return res.status(404).send(errors.array()[0].msg);
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
            return res.send("USERNAME and EMAIL should be unique");
        }
    }
);

module.exports = router;
