import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();

    const clickHandler = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            dispatch({
                type: "DELETE_WORKOUT",
                payload: workout._id
            });
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <span className='
material-symbols-outlined '

			 onClick={clickHandler}>delete</span>
        </div>
    );
};

export default WorkoutDetails;