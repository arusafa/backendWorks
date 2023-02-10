// require models which are express, nodemon, cors ...
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
// For Admin
const regisRoutes = require("./routes/register_user");
const registerTutorRoutes = require("./routes/register_tutor");
const loginRoutes = require("./routes/login&logout-tutor");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://fall2022_comp3123:SAFA.aru1993@cluster0.lclqo7i.mongodb.net/CAPSTONE?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// SERVER
const SERVER_PORT = process.env.PORT || 3333;
app.listen(SERVER_PORT, () => {
  console.log("http://localhost:3333/"); // // For Admin admin.options.rootpath
});

// parse requests of content-type - application/x-www-form-urlencoded
// Bu calismadi
// app.use(express.urlencoded({ extended: true }));

// Route     For Register
app.use("/home", regisRoutes);
app.use("/home", loginRoutes);
app.use("/home", registerTutorRoutes);
