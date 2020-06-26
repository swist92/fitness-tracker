const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const Workout = require("./models/workouts");

const PORT = process.env.PORT || 3030;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

const app = express;

app.use(logger("dev")); // error: says app.use is not a function //

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

app.post("/api/workouts", (req, res) => {
  Workout.create({
    day: new Date(),
  })
    .then((data) => res.json(data))
    .catch((event) => console.error(event));
});

app.get("/api/workouts", (req, res) => {
  Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

app.get("/api/workouts/stats", (req, res) => {
  Workout.find()
    .limit(7)
    .then((workout) => res.json(workout))
    .catch((error) => console.error(error));
  console.log(req.body);
});

app.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`);
});
