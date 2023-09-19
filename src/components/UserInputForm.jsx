import { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useAuth } from './AuthContext';
import axiosInstance from './AxiosConfig';
import DisplayPlan from './DisplayPlan';

const UserInputForm = () => {
  const { isLoggedIn, username } = useAuth();
  const [workoutRoutine, setWorkoutRoutine] = useState('');
  const [workoutSummary, setWorkoutSummary] = useState('');
  const [dietPlan, setDietPlan] = useState('');
  const [dietSummary, setDietSummary] = useState('');

  const defaultFormState = {
    sex: '',
    age: '',
    feet: '',
    inches: '',
    weight: '',
    days_per_week: '',
    dietary_restrictions: 'None',
    goals: '',
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (isLoggedIn && username) {
      axiosInstance
        .get(`/users/${username}`)
        .then((response) => {
          const userData = response.data;
          setFormData({
            sex: userData.sex || '',
            age: userData.age || '',
            feet: userData.feet || '',
            inches: userData.inches || '',
            weight: userData.weight || '',
            days_per_week: userData.days_per_week || '',
            dietary_restrictions: userData.dietary_restrictions || 'None',
            goals: userData.goals || '',
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isLoggedIn, username]);

  // Options for selects
  const sexOptions = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
  ];

  const ageOptions = [];
  for (let age = 18; age <= 100; age++) {
    ageOptions.push({ value: age, label: age.toString() });
  }

  const feetOptions = [];
  for (let feet = 3; feet <= 7; feet++) {
    feetOptions.push({ value: feet, label: feet.toString() });
  }

  const inchesOptions = [];
  for (let inches = 0; inches <= 11; inches++) {
    inchesOptions.push({ value: inches, label: inches.toString() });
  }

  const weightOptions = [];
  for (let weight = 75; weight <= 350; weight++) {
    weightOptions.push({ value: weight, label: weight.toString() });
  }

  const days_per_weekOptions = [];
  for (let days_per_week = 1; days_per_week <= 7; days_per_week++) {
    days_per_weekOptions.push({
      value: days_per_week,
      label: days_per_week.toString(),
    });
  }

  const dietary_restrictionsOptions = [
    { value: 'None', label: 'None' },
    { value: 'Dairy Free', label: 'Dairy-free' },
    { value: 'Gluten Free', label: 'Gluten-free' },
    { value: 'Keto', label: 'Keto' },
    { value: 'Lactose Intolerant', label: 'Lactose intolerant' },
    { value: 'Low FODMAP', label: 'Low FODMAP' },
    { value: 'Paleo', label: 'Paleo' },
    { value: 'Pescatarian', label: 'Pescatarian' },
    { value: 'Primal', label: 'Primal' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Whole30', label: 'Whole30' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      user_id: username,
      ...formData,
    };

    axiosInstance
      .post('/generate_plan', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setWorkoutRoutine(response.data.workout_routine);
        setWorkoutSummary(response.data.workout_summary);
        setDietPlan(response.data.diet_plan);
        setDietSummary(response.data.diet_summary);
      })
      .catch((error) => {
        console.error('Error generating plan:', error);
      });
  };

  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <fieldset className='form-fieldset'>
            <div className='line-group'>
              <label className='form-label'>
                Sex
                <Select
                  className='form-select'
                  name='sex'
                  options={sexOptions}
                  placeholder='-- Select --'
                  onChange={(option) => handleInputChange('sex', option.value)}
                  value={sexOptions.find((option) => option.value === formData.sex)}
                  required
                />
              </label>

              <label className='form-label'>
                Age
                <Select
                  className='form-select'
                  name='age'
                  options={ageOptions}
                  placeholder='-- Select --'
                  onChange={(option) => handleInputChange('age', option.value)}
                  value={ageOptions.find((option) => option.value === formData.age)}
                  required
                />
              </label>

              <label className='form-label'>
                Feet
                <Select
                  className='form-select'
                  name='feet'
                  options={feetOptions}
                  placeholder='-- Select --'
                  onChange={(option) => handleInputChange('feet', option.value)}
                  value={feetOptions.find((option) => option.value === formData.feet)}
                  required
                />
              </label>

              <label className='form-label'>
                Inches
                <Select
                  className='form-select'
                  name='inches'
                  options={inchesOptions}
                  placeholder='-- Select --'
                  onChange={(option) => handleInputChange('inches', option.value)}
                  value={inchesOptions.find((option) => option.value === formData.inches)}
                  required
                />
              </label>

              <label className='form-label'>
                Weight (lbs)
                <Select
                  className='form-select'
                  name='weight'
                  options={weightOptions}
                  placeholder='-- Select --'
                  onChange={(option) => handleInputChange('weight', option.value)}
                  value={weightOptions.find((option) => option.value === formData.weight)}
                  required
                />
              </label>

              <label className='form-label'>
                Days Per Week
                <Select
                  className='form-select'
                  name='days_per_week'
                  options={days_per_weekOptions}
                  placeholder='-- Select --'
                  onChange={(option) => handleInputChange('days_per_week', option.value)}
                  value={days_per_weekOptions.find((option) => option.value === formData.days_per_week)}
                  required
                />
              </label>

              <label className='form-label'>
                Dietary Restrictions
                <CreatableSelect
                  className='form-select'
                  name='dietary_restrictions'
                  options={dietary_restrictionsOptions}
                  placeholder='-- Select or Create --'
                  onChange={(option) => handleInputChange('dietary_restrictions', option.value)}
                  value={dietary_restrictionsOptions.find((option) => option.value === formData.dietary_restrictions)}
                  required
                />
              </label>

              <label className='form-label'>
                Goals
                <textarea
                  name='goals'
                  placeholder='Describe your fitness goals...'
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  value={formData.goals}
                  required
                ></textarea>
              </label>
            </div>
          </fieldset>
          <button className='form-btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
      {workoutRoutine && workoutSummary && dietPlan && dietSummary && (
        <DisplayPlan
          workoutRoutine={workoutRoutine}
          workoutSummary={workoutSummary}
          dietPlan={dietPlan}
          dietSummary={dietSummary}
        />
      )}
    </>
  );
};

export default UserInputForm;
