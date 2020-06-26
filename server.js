const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const Workout = require("./models.workouts");

const PORT = process.env.PORT || 3030;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",{
    useNewUrlParser: true;
});

