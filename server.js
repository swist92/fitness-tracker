const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");

const Workout = require("./models/workouts");

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

const app = express();

app.use(logger("dev"));
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
app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
app.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: req.body,
      },
    }
  ).then((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});
app.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then((data) => res.json(data))
    .catch((e) => console.error(e));
});
app.get("/api/workouts/range", (req, res) => {
  Workout.find()
    .limit(7)
    .then((workout) => res.json(workout))
    .catch((e) => console.error(e));
  console.log(req.body);
});
app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});
