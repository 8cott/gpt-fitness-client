import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axiosInstance from './AxiosConfig';
import { useAuth } from './AuthContext';

const SavedDietPlans = () => {
  const { userId } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/my_diet_plans')
      .then((response) => {
        setPlans(response.data);
        if (response.data.length > 0) {
          setSelectedPlan(response.data[0]);
          fetchPlanDetails(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error('Error fetching diet plans:', error);
      });
  }, [userId]);

  const fetchPlanDetails = (planId) => {
    axiosInstance
      .get(`/my_diet_plans/${planId}`)
      .then((response) => {
        setPlanDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching diet plan details:', error);
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
          <span className='select-plan-label'>Select Saved Diet Plan</span>
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
          <div className='diet-container'>
            <h3 className='plan-header'>Diet Summary</h3>
            <p className='plan-body summary'>{planDetails.diet_summary}</p>
            <h3 className='plan-header'>Diet Plan</h3>
            <ul className='plan-body routine'>
              {formatTextWithDashes(planDetails.diet_plan)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedDietPlans;
