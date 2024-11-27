const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;