const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    Name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    qualification: { type: String, required: true },
    collegeName: { type: String, required: true }  
});

const User = model("User", UserSchema);

module.exports = { User };
