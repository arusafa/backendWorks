const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const routes = express.Router();
const registerTutorModel = require("../models/tutor_db");

// GET ALL REGISTERED TUTORS
routes.get("/register/tutor/result", async (req, res) => {
  try {
    const data = await registerTutorModel.find();
    res.status(201).json(data);
    console.log("Display all data");
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// REGISTER OR INSERT DATA
routes.post("/register/tutor", async (req, res) => {
  const add_register = new registerTutorModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  try {
    const save_register = await add_register.save();
    res.status(201).json(save_register);
    console.log("insert");
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// FIND BY ID
routes.get("/register/tutor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const byDataid = await registerTutorModel.findById(id);
    res.status(201).json(byDataid);
    console.log("id took it");
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// UPDATE
routes.put("/register/tutor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }
    const options = { new: true };
    const result = await registerTutorModel.findByIdAndUpdate(
      id,
      updateData,
      options
    );
    res.status(201).json(result);
    console.log("id updated it");
  } 
  catch (error) {
    res.status(500).json({error: error.message});
    console.log(error)
  }
});

// DELETE
routes.delete("/register/tutor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await registerTutorModel.findByIdAndDelete(id);
    res.status(201).json(result);
    console.log("id has been deleted it");
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = routes;
