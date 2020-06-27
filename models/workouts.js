const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },

    exercises: [
      {
        name: {
          type: String,
        },
        type: {
          type: String,
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        duration: {
          type: Number,
        },
        distance: {
          type: Number,
        },
        sets: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercises) => {
    return total + exercises.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;