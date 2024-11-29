import React, { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();
export const WorkoutReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUT":
            return {
                workouts: action.payload
            };
        case "CREATE_WORKOUT":
            return {
                workouts: [...state.workouts, action.payload] // Append the new workout to the existing list
            };
			case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(workout=> workout._id !== action.payload)
      };
        default:
            return state;
    }
};

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(WorkoutReducer, { workouts: null });

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};