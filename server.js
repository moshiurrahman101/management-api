require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", require("./router/auth"));


// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));


// Basic Route list
app.get("/", (req, res) => {
    res.send("Welcome to the management API");
});

// Starting Server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});


