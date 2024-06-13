
const express = require("express");
const jwt = require("jsonwebtoken");
const tokenSecret = "manu";
const { signupValidationRules } = require("../validation/signup.validation");
const { validationResult } = require("express-validator");
const { Signup } = require("../models/signup.model");

const router = express.Router();

router.use(express.json());

router.post(
    "/signup",
    signupValidationRules(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { Name, email, password } = req.body;

            const find = await Signup.findOne({ email });
            if (find) {
                return res.status(404).json({
                    message: "User already found",
                    status: false
                });
            } else {
                const newUser = new Signup({
                    Name,
                    email,
                    password
                });

                await newUser.save();
                const token = jwt.sign({ email }, tokenSecret);
                return res.status(200).json({
                    message: "Student signed up successfully",
                    token: token,
                    status: true
                });
            }
        } catch (error) {
            console.error(error); // Add error logging
            return res.status(500).json({
                message: "Internal server error",
                status: false
            });
        }
    }
);

router.post(
    "/login",
    async (req, res) => {
        try {
            const { email, password } = req.body;

            const find = await Signup.findOne({ email, password });
            if (find) {
                const token = jwt.sign({ email }, tokenSecret);
                return res.status(200).json({
                    message: "Student logged in successfully",
                    token: token,
                    status: true
                });
            } else {
                return res.status(404).json({
                    message: "Please sign up",
                    status: false
                });
            }
        } catch (error) {
            console.error(error); // Add error logging
            return res.status(500).json({
                message: "Internal server error",
                status: false
            });
        }
    }
);

module.exports = router;
