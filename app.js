const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const signupAndLoginRoutes = require("./routes/signup.routes");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", signupAndLoginRoutes);

const mongoURI = process.env.MONGO_URL;
const connectToDB = () => {
    if (mongoURI) {
        mongoose
            .connect(mongoURI)
            .then(() => console.log("MongoDB connected successfully"))
            .catch((err) => console.error("Error connecting to MongoDB:", err));
    } else {
        console.log("No mongoURI found");
    }
};

app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"frontend","dist")));
    res.sendFile(path.resolve(__dirname,"frontend","dist","app.jsx"));
})
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDB();
});
