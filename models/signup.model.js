const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SignupSchema = new Schema({
    Name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const Signup = model("Signup", SignupSchema);

module.exports = { Signup };
