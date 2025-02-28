import React, { useState } from "react";
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const [emptyfield, setEmptyfield] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, load, reps };
        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyfield(json.emptyfield)
        } else {
            setLoad('');
            setReps('');
            setTitle('');
            setError(null);
            setEmptyfield([]);
            dispatch({
                type: "CREATE_WORKOUT",
                payload: json
            });
            console.log('successfully added', json);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new workout</h3>

            <label>Exercise title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} 
            className={
                emptyfield.includes('title')?'error':''
            }/>

            <label>Exercise Reps</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps}
            className={
                emptyfield.includes('reps')?'error':''
            } />

            <label>Exercise Load</label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} 
            className={
                emptyfield.includes('load')?'error':''
            }/>

            <button>Add workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;