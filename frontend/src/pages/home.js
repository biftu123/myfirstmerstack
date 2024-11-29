import React, { useEffect } from "react";
import WorkoutDetails from "../components/workoutdetails";
import WorkoutForm from "../components/workoutform";
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch("/api/workouts/");
                const json = await response.json();
                if (response.ok) {
                    dispatch({
                        type: "SET_WORKOUT",
                        payload: json
                    });
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchWorkouts();
    }, [dispatch]); 

    return (
        <div className="home">
            <div className="workout">
                {workouts && workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))
                ) : (
                    <p>No workouts found.</p>
                )}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;