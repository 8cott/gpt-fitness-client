import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axiosInstance from './AxiosConfig';
import { useAuth } from './AuthContext';

const SavedFitnessPlans = () => {
  const { userId } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/my_fitness_plans')
      .then((response) => {
        setPlans(response.data);
        if (response.data.length > 0) {
          setSelectedPlan(response.data[0]);
          fetchPlanDetails(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error('Error fetching fitness plans:', error);
      });
  }, [userId]);

  const fetchPlanDetails = (planId) => {
    axiosInstance
      .get(`/my_fitness_plans/${planId}`)
      .then((response) => {
        setPlanDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fitness plan details:', error);
      });
  };

  const handlePlanChange = (selectedOption) => {
    setSelectedPlan(selectedOption);
    fetchPlanDetails(selectedOption.id);
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
    <div className='saved-plan-container'>
      <div className='plan-container'>
        <label className='form-label'>
          <span className='select-plan-label'>Select Saved Fitness Plan</span>
          <Select
            className='form-select-saved-plan'
            classNamePrefix='react-select'
            value={selectedPlan}
            onChange={handlePlanChange}
            options={plans}
            getOptionLabel={(option) => option.plan_name}
            getOptionValue={(option) => option.id}
          />
        </label>
      </div>
      <div className='plan-container'>
        {planDetails && (
          <div className='workout-container'>
            <h3 className='plan-header'>Workout Summary</h3>
            <p className='plan-body summary'>{planDetails.workout_summary}</p>
            <h3 className='plan-header'>Workout Routine</h3>
            <ul className='plan-body routine'>
              {formatTextWithDashes(planDetails.workout_routine)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedFitnessPlans;
