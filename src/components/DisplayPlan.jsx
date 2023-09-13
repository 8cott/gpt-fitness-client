import React from 'react';

const DisplayPlan = ({ workoutRoutine, workoutSummary, dietPlan, dietSummary }) => {
  return (
    <div className='plan-container'>
      <h3>Workout Routine</h3>
      <p>{workoutRoutine}</p>
      
      <h3>Workout Summary</h3>
      <p>{workoutSummary}</p>
      
      <h3>Diet Plan</h3>
      <p>{dietPlan}</p>
      
      <h3>Diet Summary</h3>
      <p>{dietSummary}</p>
    </div>
  );
};

export default DisplayPlan;
