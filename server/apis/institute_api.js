const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Institute = require('../models/master_institute');

const instituteApp = express.Router();

// POST - Register new institute
instituteApp.post(
  "/register/institute",
  expressAsyncHandler(async (req, res) => {
    const instituteData = req.body;
    console.log("Received data:", instituteData);

    // Check if institute already exists by name
    const existingInstitute = await Institute.findOne({
      Institute_Name: instituteData.Institute_Name,
    });
    if (existingInstitute) {
      return res.status(409).send({ message: "Institute already exists" });
    }

    // Validate required fields
    if (
      !instituteData.Institute_Name ||
      !instituteData.Email_ID ||
      !instituteData.password ||
      !instituteData.Address ||
      !instituteData.Address.Street ||
      !instituteData.Address.District ||
      !instituteData.Address.State ||
      !instituteData.Address.Pincode
    ) {
      return res.status(400).send({ message: "All required fields must be provided" });
    }

    // Create and save new institute
    const newInstitute = new Institute({
      Institute_Name: instituteData.Institute_Name,
      Address: {
        Street: instituteData.Address.Street,
        District: instituteData.Address.District,
        State: instituteData.Address.State,
        Pincode: instituteData.Address.Pincode,
      },
      Email_ID: instituteData.Email_ID,
      password: instituteData.password,
      Contact_No: instituteData.Contact_No,
      Medicine_Inventory: [], // empty initially
      Orders: [], // empty initially
    });

    const savedInstitute = await newInstitute.save();

    res.status(201).send({
      message: "Institute registered successfully",
      payload: savedInstitute,
    });
  })
);

// POST - Login Institute
instituteApp.post(
  '/institute/login',
  expressAsyncHandler(async (req, res) => {
    const { Email_ID, password } = req.body;

    // Validate fields
    if (!Email_ID || !password) {
      return res
        .status(400)
        .send({ message: "Email and Password are required" });
    }

    // Find institute by email
    const institute = await Institute.findOne({ Email_ID: Email_ID.trim() });

    if (!institute) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Match password (plain text version — ideally hash this later)
    if (institute.password !== password) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    res.status(200).send({
      message: "Login successful",
      payload: institute,
    });
  })
);



module.exports = instituteApp;