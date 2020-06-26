const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const Workout = require("./models.workouts");

const PORT = process.env.PORT || 3030;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",{
    useNewUrlParser: true
});

const app = express;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.post("/api/workouts", (req, res) => {
    Workout.create({
        day: new Date()
    })
        .then((data) => res.json(data))
        .catch(event => console.error(event))
});

