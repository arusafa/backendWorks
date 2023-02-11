const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookkieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Tutor = require("../models/tutor_db");

/*
{
  "email":"test@testemail.com",
  "password":"test@testemail.com"
}
*/

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
          email: user.email,
        };
        const keys = process.env.SECRET_KEY || "secret";

        // Sign token
        jwt.sign(
          payload,
          keys,
          {
            expiresIn: "1d",
          },
          (err, token) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.cookie("token", token, {
              expires: new Date(Date.now() + 86400 * 1000),
              httpOnly: true,
            });

            return res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ error: "Password incorrect" });
      }
    });
  });
});

// Logout
routes.post("/logout/tutor", (req, res) => {
  res.clearCookie("XSRF-TOKEN");
  res.json({ message: "Successfully logged out" });
});

module.exports = routes;
