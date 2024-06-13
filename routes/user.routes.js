const express = require("express");
const { jsonwebtoken } = require("../middleware/user.middleware");
const { User } = require("../models/user.model");
const { userValidationRules } = require("../validation/user.validation");
const { validationResult } = require("express-validator");

const router = express.Router();

router.use(express.json());

router.post(
    "/create/student",
    jsonwebtoken,
    userValidationRules(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { Name,email, age, qualification, collegeName } = req.body;

            const findUser = await User.findOne({ email});

            if (findUser) {
                return res.status(401).json({
                    message: "User already found",
                    status: false
                });
            } else {
                const user = new User({
                    Name,
                    email,
                    age,
                    qualification,
                    collegeName
                });

                await user.save();

                return res.status(201).json({
                    message: "User created successfully",
                    data: user,
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

router.get(
    "/student",
    jsonwebtoken,
    async (req, res) => {
        try {
            const { email } = req.headers;
            if (!email) {
                const allStudent = await User.find({});
                return res.status(200).json({
                    students: allStudent,
                    status: true
                });
            } else {
                const student = await User.findOne({ email });
                if (!student) {
                    return res.status(404).json({
                        message: "Student not found",
                        status: false
                    });
                } else {
                    return res.status(200).json({
                        student: student,
                        status: true
                    });
                }
            }
        } catch (error) {
            console.error(error); // Add error logging
            return res.status(500).json({
                message: "Internal server error",
                error: error,
                status: false
            });
        }
    }
);

// router.put(
//     "/update/student/:email",
//     jsonwebtoken,
//     async (req, res) => {
//         try {
//             const { email } = req.params;
//             const { Name, age, qualification, collgeName } = req.body;

//             const existingUser = await User.findOne({ email });

//             if (!existingUser) {
//                 return res.status(404).json({
//                     message: "Student not found",
//                     status: false
//                 });
//             }

//             existingUser.set({
//                 Name,
//                 age,
//                 qualification,
//                 collgeName
//             });

//             await existingUser.save();

//             return res.status(200).json({
//                 updated: existingUser,
//                 status: true
//             });
//         } catch (error) {
//             console.error(error); // Add error logging
//             return res.status(500).json({
//                 message: "Internal server error",
//                 status: false
//             });
//         }
//     }
// );
router.put(
    "/update/student/:email",
    jsonwebtoken,
    async (req, res) => {
        try {
            const { email } = req.params;
            const { Name, age, qualification, collegeName } = req.body;

            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(404).json({
                    message: "Student not found",
                    status: false
                });
            }

            // Update fields conditionally based on what's provided in req.body
            if (Name) existingUser.Name = Name;
            if (age) existingUser.age = age;
            if (qualification) existingUser.qualification = qualification;
            if (collegeName) existingUser.collgeName = collegeName;

            await existingUser.save();

            return res.status(200).json({
                updated: existingUser,
                status: true
            });
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
    "/delete/student",
    jsonwebtoken,
    async (req, res) => {
        try {
            const {email}=req.body;
            const find = await User.findOneAndDelete({ email });

            if (find) {
                return res.status(200).json({
                    message: "Student deleted",
                    status: true,
                    data: find
                });
            } else {
                return res.status(404).json({
                    message: "Student not found",
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
