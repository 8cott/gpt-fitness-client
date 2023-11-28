import { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useAuth } from './AuthContext';
import axiosInstance from './AxiosConfig';
import DisplayFitnessPlan from './DisplayFitnessPlan';
import DisplayDietPlan from './DisplayDietPlan';

const UserInputForm = () => {
  const { isLoggedIn, userId } = useAuth();
  const [workoutRoutine, setWorkoutRoutine] = useState('');
  const [workoutSummary, setWorkoutSummary] = useState('');
  const [dietPlan, setDietPlan] = useState('');
  const [dietSummary, setDietSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loaderType, setLoaderType] = useState(null);

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
    console.log('Diet Plan State Updated:', dietPlan);
    console.log('Diet Summary State Updated:', dietSummary);
  }, [dietPlan, dietSummary]);

  useEffect(() => {
    if (isLoggedIn && userId) {
      axiosInstance
        .get(`/users/${userId}`)
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
  }, [isLoggedIn, userId]);

  const sexOptions = [
    { value: 'F', label: 'F' },
    { value: 'M', label: 'M' },
  ];

  const ageOptions = [];
  for (let age = 18; age <= 100; age++) {
    ageOptions.push({ value: age, label: age.toString() });
  }

  const feetOptions = [];
  for (let feet = 3; feet <= 7; feet++) {
    feetOptions.push({ value: feet, label: feet.toString() + "'" });
  }

  const inchesOptions = [];
  for (let inches = 0; inches <= 11; inches++) {
    inchesOptions.push({ value: inches, label: inches.toString() + '"' });
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
  };

  const updateUserData = () => {
    return new Promise((resolve, reject) => {
      if (!userId) {
        resolve();
        return;
      }

      axiosInstance
        .put(`/users/${userId}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleGenerateFitnessPlan = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoaderType('fitness');

    setDietPlan('');
    setDietSummary('');

    const payload = {
      user_id: userId,
      ...formData,
    };

    console.log('Sending fitness plan request with payload:', payload);
    updateUserData()
      .then(() => {
        return axiosInstance.post('/generate_fitness_plan', payload);
      })
      .then((response) => {
        console.log('Received fitness plan response:', response);
        setWorkoutRoutine(response.data.workout_routine);
        setWorkoutSummary(response.data.workout_summary);
        setIsLoading(false);
        setLoaderType(null);
      })
      .catch((error) => {
        console.error('Error generating fitness plan:', error);
        setIsLoading(false);
      });
  };

  const handleGenerateDietPlan = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoaderType('diet');

    setWorkoutRoutine('');
    setWorkoutSummary('');

    const payload = {
      user_id: userId,
      ...formData,
    };

    console.log('Sending diet plan request with payload:', payload);
    updateUserData()
      .then(() => {
        return axiosInstance.post('/generate_diet_plan', payload);
      })
      .then((response) => {
        console.log('Received diet plan response:', response);
        setDietPlan(response.data.diet_plan);
        setDietSummary(response.data.diet_summary);
        setIsLoading(false);
        setLoaderType(null);
      })
      .catch((error) => {
        console.error('Error generating diet plan:', error);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <fieldset className='form-fieldset'>
            <div className='form-row'>
              <div className='form-elements-container'>
                <label className='form-label'>
                  Sex
                  <Select
                    className='form-select sex'
                    classNamePrefix='react-select'
                    name='sex'
                    options={sexOptions}
                    onChange={(option) =>
                      handleInputChange('sex', option.value)
                    }
                    value={sexOptions.find(
                      (option) => option.value === formData.sex
                    )}
                    required
                  />
                </label>

                <label className='form-label'>
                  Age
                  <Select
                    className='form-select age'
                    classNamePrefix='react-select'
                    name='age'
                    options={ageOptions}
                    onChange={(option) =>
                      handleInputChange('age', option.value)
                    }
                    value={ageOptions.find(
                      (option) => option.value === formData.age
                    )}
                    required
                  />
                </label>

                <div className='form-label'>
                  <label htmlFor='feet'>Height (ft)</label>
                  <Select
                    id='feet'
                    className='form-select feet'
                    classNamePrefix='react-select'
                    name='feet'
                    options={feetOptions}
                    onChange={(option) =>
                      handleInputChange('feet', option.value)
                    }
                    value={feetOptions.find(
                      (option) => option.value === formData.feet
                    )}
                    required
                  />
                </div>

                <div className='form-label'>
                  <label htmlFor='inches'>Height (in)</label>
                  <Select
                    id='inches'
                    className='form-select inches'
                    classNamePrefix='react-select'
                    name='inches'
                    options={inchesOptions}
                    onChange={(option) =>
                      handleInputChange('inches', option.value)
                    }
                    value={inchesOptions.find(
                      (option) => option.value === formData.inches
                    )}
                    required
                  />
                </div>

                <label className='form-label'>
                  Weight (lbs)
                  <Select
                    className='form-select weight'
                    classNamePrefix='react-select'
                    name='weight'
                    options={weightOptions}
                    onChange={(option) =>
                      handleInputChange('weight', option.value)
                    }
                    value={weightOptions.find(
                      (option) => option.value === formData.weight
                    )}
                    required
                  />
                </label>
                <label className='form-label'>
                  Workout Days Per Week
                  <Select
                    className='form-select days'
                    classNamePrefix='react-select'
                    name='days_per_week'
                    options={days_per_weekOptions}
                    onChange={(option) =>
                      handleInputChange('days_per_week', option.value)
                    }
                    value={days_per_weekOptions.find(
                      (option) => option.value === formData.days_per_week
                    )}
                    required
                  />
                </label>

                <label className='form-label'>
                  Dietary Restrictions
                  <CreatableSelect
                    className='form-select diet'
                    classNamePrefix='react-select'
                    name='dietary_restrictions'
                    options={dietary_restrictionsOptions}
                    onChange={(option) =>
                      handleInputChange('dietary_restrictions', option.value)
                    }
                    value={dietary_restrictionsOptions.find(
                      (option) => option.value === formData.dietary_restrictions
                    )}
                    required
                  />
                </label>
              </div>
              <label className='form-label stretch full-width'>
                Goals
                <textarea
                  name='goals'
                  className='form-input goals'
                  placeholder='Example: Lose 10 lbs, gain muscle, etc.'
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  value={formData.goals}
                  required
                ></textarea>
              </label>
            </div>
          </fieldset>
          <div className='btn-container'>
            <button
              className='form-btn generate-btn'
              onClick={handleGenerateFitnessPlan}
              disabled={isLoading}
            >
              {isLoading && loaderType === 'fitness' ? (
                <>
                  <span>Generating</span>
                  <div
                    className='button-spinner'
                    style={{ marginLeft: '8px' }}
                  ></div>
                </>
              ) : (
                'Generate Fitness Plan'
              )}
            </button>
            <button
              className='form-btn generate-btn'
              onClick={handleGenerateDietPlan}
              disabled={isLoading}
            >
              {isLoading && loaderType === 'diet' ? (
                <>
                  <span>Generating</span>
                  <div
                    className='button-spinner'
                    style={{ marginLeft: '8px' }}
                  ></div>
                </>
              ) : (
                'Generate Diet Plan'
              )}
            </button>
          </div>
        </form>
      </div>

      <>
        {workoutRoutine && workoutSummary && (
          <DisplayFitnessPlan
            workoutRoutine={workoutRoutine}
            workoutSummary={workoutSummary}
          />
        )}
        {dietPlan && dietSummary && (
          <DisplayDietPlan dietPlan={dietPlan} dietSummary={dietSummary} />
        )}
      </>
    </>
  );
};

export default UserInputForm;
