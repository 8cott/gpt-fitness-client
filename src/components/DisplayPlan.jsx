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

const DisplayPlan = ({
  workoutRoutine,
  workoutSummary,
  dietPlan,
  dietSummary,
}) => {
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
    </div>
  );
};

export default DisplayPlan;
