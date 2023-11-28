import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import axiosInstance from './AxiosConfig';

const DisplayDietPlan = ({ dietPlan, dietSummary }) => {
  console.log('DisplayDietPlan Props', { dietPlan, dietSummary })
  const { isLoggedIn, userId } = useAuth();
  const [planName, setPlanName] = useState('');
  const [isEnteringName, setIsEnteringName] = useState(false);

  const handleEnterName = () => {
    setIsEnteringName(true);
  };

  const handleSavePlan = () => {
    if (!isLoggedIn) {
      alert('Please login to save your diet plan'); 
      return;
    }

    if (!planName) {
      alert('Please enter a plan name before saving');
      return;
    }

    const planData = {
      user_id: userId,
      diet_plan: dietPlan,
      diet_summary: dietSummary,
      plan_name: planName,
    };

    axiosInstance
      .post('save_diet_plan', planData, { 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        alert('Diet plan saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving diet plan:', error);
        alert('Error saving diet plan. Please try again.');
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
      <div className='diet-container'>
        <h3 className='plan-header'>Diet Summary</h3>
        <p className='plan-body summary'>{dietSummary}</p>

        <h3 className='plan-header'>Diet Plan</h3>
        <ul className='plan-body routine'>
          {formatTextWithDashes(dietPlan)}
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
          <div className='btn-container'>
          <button className='save-plan-btn' onClick={handleSavePlan}>
            Save Plan
          </button>
          </div>
        </div>
      ) : (
        <div className='btn-container'>
        <button className='save-plan-btn' onClick={handleEnterName}>
          Save Plan
        </button>
        </div>
      )}
    </div>
  );
};

export default DisplayDietPlan;
