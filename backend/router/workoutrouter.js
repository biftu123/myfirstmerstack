const express = require('express');
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutcontroller');

const router = express.Router();

router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;