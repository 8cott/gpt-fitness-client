import { useAuth } from './AuthContext';
import axiosInstance from './AxiosConfig';

const DisplayPlan = ({
  workoutRoutine,
  workoutSummary,
  dietPlan,
  dietSummary,
}) => {
  const { isLoggedIn, userId } = useAuth();

  const handleSavePlan = () => {
    if (!isLoggedIn) {
      alert('Please login to save your plan');
      return;
    }

    const planData = {
      user_id: userId,
      workout_routine: workoutRoutine,
      workout_summary: workoutSummary,
      diet_plan: dietPlan,
      diet_summary: dietSummary,
    };

    axiosInstance
      .post('save_plan', planData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        alert('Plan saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving plan:', error);
        alert('Error saving plan. Please try again.');
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
      <div className='diet-container'>
        <h3 className='plan-header'>Diet Summary</h3>
        <p className='plan-body summary'>{dietSummary}</p>

        <h3 className='plan-header'>Diet Plan</h3>
        <ul className='plan-body routine'>{formatTextWithDashes(dietPlan)}</ul>
      </div>
      <button className='save-plan-btn' onClick={handleSavePlan}>
        Save Plan
      </button>
    </div>
  );
};

export default DisplayPlan;
