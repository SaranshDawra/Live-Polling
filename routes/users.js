const express = require("express");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
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
        return res.status(500).send("Something went wrong, try again later");
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
                return res.send({
                    msg: "Invalid inputs passed, please check your data",
                });
            }
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        try {
            user = await user.save();
        } catch (err) {
            return res.send({ msg: "USERNAME and EMAIL should be unique" });
        }

        let token;
        try {
            token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.jwtPrivateKey
            );
        } catch (err) {
            return res.send({
                msg: "Signing up failed, please try again later",
            });
        }

        res.send({
            token: token,
            userId: user._id,
            email: user.email,
        });
    }
);

router.post(
    "/signin",
    async (req, res) => {

        const { email, password } = req.body;

        let user;
        try {
            user = await User.findOne({ email: email });
        } catch (err) {
            return res
                .status(500)
                .send("Signing in failed, please try again later");
        }

        if (!user) {
            return res
                .status(404)
                .send("Invalid credentials, could not log you in.");
        }

        let isValidPassword;
        try {
            isValidPassword = await bcrypt.compare(
                password,
                user.password
            );
        } catch (err) {
            return res
                .status(500)
                .send(
                    "Could not log you in, please check your credentials and try again."
                );
        }

        if (!isValidPassword) {
            return res
                .status(404)
                .send("Invalid credentials, could not log you in.");
        }

        let token;
        try {
            token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.jwtPrivateKey
            );
        } catch (err) {
            return res.send({
                msg: "Signing up failed, please try again later",
            });
        }

        res.send({
            token: token,
            userId: user._id,
            email: user.email,
        });
    }
);

module.exports = router;
