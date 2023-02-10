const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookkieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Tutor = require("../models/tutor_db");

routes.post("/login/tutor", (req, res) => {
  const { email, password } = req.body;

  Tutor.findOne({ email }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ emailoRPasswordNotFound: "Email or Password not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        const keys = "secret"
        // Sign token
        jwt.sign(
          payload,
          keys.toString(),
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            return res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Logout
routes.post("/logout/tutor", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  console.log("logout");
});

module.exports = routes;
