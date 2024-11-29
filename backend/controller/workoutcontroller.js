const Workout = require('../model/workoutmodel');

// Controller functions
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
    const { id } = req.params;

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    let emptyfield = [];
    if(!title){
         emptyfield.push('title')
    }
    if(!load){
        emptyfield.push('load')
   }
   if(!reps){
    emptyfield.push('reps')
}
if(emptyfield.length >0){
    return res.status('400').json({error:'please fill all the fields:', emptyfield})
}

    const workout = new Workout({ title, load, reps });

    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    const workout = await Workout.findByIdAndDelete({ _id: id });

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json("delete suceccfully!");
};

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    const workout = await Workout.findByIdAndUpdate(
        { _id: id },
        { ...req.body }
    );

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};