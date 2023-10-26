import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import axiosInstance from './AxiosConfig';

const DisplayFitnessPlan = ({ workoutRoutine, workoutSummary }) => {
  const { isLoggedIn, userId } = useAuth();
  const [planName, setPlanName] = useState('');
  const [isEnteringName, setIsEnteringName] = useState(false);

  const handleEnterName = () => {
    setIsEnteringName(true);
  };

  const handleSavePlan = () => {
    if (!isLoggedIn) {
      alert('Please login to save your fitness plan');
      return;
    }

    if (!planName) {
      alert('Please enter a plan name before saving');
      return;
    }

    const planData = {
      user_id: userId,
      workout_routine: workoutRoutine,
      workout_summary: workoutSummary,
      plan_name: planName,
    };

    axiosInstance
      .post('save_fitness_plan', planData, {   
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        alert('Fitness plan saved successfully!');   
      })
      .catch((error) => {
        console.error('Error saving fitness plan:', error);   
        alert('Error saving fitness plan. Please try again.');
      });
  };


  const formatTextWithDashes = (text) => {
    const lines = text.split('\n');
    const formattedLines = lines.map((line, index) => {
      if (line.trim().startsWith('-')) {
        return <li key={`bullet-${index}`}>{line.trim().substring(1)}</li>;
      }
      return <p key={`paragraph-${index}`}>{line}</p>;
    });
    return formattedLines;
  };

  return (
    <div className='plan-container'>
      <div className='workout-container'>
        <h3 className='plan-header'>Workout Summary</h3>
        <p className='plan-body summary'>{workoutSummary}</p>

        <h3 className='plan-header'>Workout Routine</h3>
        <ul className='plan-body routine'>
          {formatTextWithDashes(workoutRoutine)}
        </ul>
      </div>
      {isEnteringName ? (
        <div>
          <input
            type="text"
            placeholder="Enter Plan Name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
          <button className='save-plan-btn' onClick={handleSavePlan}>
            Save Plan
          </button>
        </div>
      ) : (
        <button className='save-plan-btn' onClick={handleEnterName}>
          Save Plan
        </button>
      )}
    </div>
  );
};

export default DisplayFitnessPlan;
