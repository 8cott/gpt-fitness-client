import { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useAuth } from './AuthContext';
import axiosInstance from './AxiosConfig';

const Form = () => {
  const { isLoggedIn, username } = useAuth();
  const useFormField = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (eventOrValue) => {
      if (eventOrValue && eventOrValue.value !== undefined) {
        setValue(eventOrValue.value);
      } else if (eventOrValue && eventOrValue.target) {
        setValue(eventOrValue.target.value);
      }
    };
    return [value, handleChange];
  };

  useEffect(() => {
    if (isLoggedIn && username) {
      axiosInstance
        .get(`/users/${username}`)
        .then((response) => {
          const userData = response.data;
          console.log('Fetched user data:', userData);
          handleSexChange({ value: userData.sex });
          handleAgeChange({ value: userData.age });
          handleFeetChange({ value: userData.feet });
          handleInchesChange({ value: userData.inches });
          handleWeightChange({ value: userData.weight });
          handleDaysPerWeekChange({ value: userData.days_per_week });
          handleDietaryRestrictionsChange({
            value: userData.dietary_restrictions,
          });
          handleGoalsChange({ target: { value: userData.goals } });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isLoggedIn, username]);

  const [sex, handleSexChange] = useFormField('');
  const [age, handleAgeChange] = useFormField('');
  const [feet, handleFeetChange] = useFormField('');
  const [inches, handleInchesChange] = useFormField('');
  const [weight, handleWeightChange] = useFormField('');
  const [daysPerWeek, handleDaysPerWeekChange] = useFormField('');
  const [dietaryRestrictions, handleDietaryRestrictionsChange] =
    useFormField('none');
  const [goals, handleGoalsChange] = useFormField('');

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

  const daysPerWeekOptions = [];
  for (let daysPerWeek = 1; daysPerWeek <= 7; daysPerWeek++) {
    daysPerWeekOptions.push({
      value: daysPerWeek,
      label: daysPerWeek.toString(),
    });
  }

  const dietaryRestrictionsOptions = [
    { value: 'None', label: 'None' },
    { value: 'dairyFree', label: 'Dairy-free' },
    { value: 'glutenFree', label: 'Gluten-free' },
    { value: 'keto', label: 'Keto' },
    { value: 'lactoseIntolerant', label: 'Lactose intolerant' },
    { value: 'lowFODMAP', label: 'Low FODMAP' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'primal', label: 'Primal' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'whole30', label: 'Whole30' },
  ];

  return (
    <>
      <div className='form-container'>
        <fieldset className='form-fieldset'>
          <div className='line-group'>
            <label className='form-label'>
              Sex
              <Select
                className='form-select'
                name='sex'
                options={sexOptions}
                placeholder='-- Select --'
                isSearchable={false}
                onChange={handleSexChange}
                value={sexOptions.find((option) => option.value === sex)}
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
                onChange={handleAgeChange}
                value={ageOptions.find((option) => option.value === age)}
                required
              />
            </label>

            <label className='form-label'>
              Height
              <div className='height-container'>
                <Select
                  className='form-select form-select--feet'
                  name='feet'
                  options={feetOptions}
                  placeholder='Feet'
                  onChange={handleFeetChange}
                  value={feetOptions.find((option) => option.value === feet)}
                  required
                />
                <Select
                  className='form-select form-select--inches'
                  name='inches'
                  options={inchesOptions}
                  placeholder='Inches'
                  onChange={handleInchesChange}
                  value={inchesOptions.find(
                    (option) => option.value === inches
                  )}
                  required
                />
              </div>
            </label>

            <label className='form-label'>
              Weight
              <Select
                className='form-select'
                name='weight'
                options={weightOptions}
                placeholder='-- Select --'
                onChange={handleWeightChange}
                value={weightOptions.find((option) => option.value === weight)}
                required
              />
            </label>
          </div>
          <div className='line-group'>
            <label className='form-label'>
              Days per week
              <Select
                className='form-select'
                name='daysPerWeek'
                options={daysPerWeekOptions}
                placeholder='-- Select --'
                onChange={handleDaysPerWeekChange}
                value={daysPerWeekOptions.find(
                  (option) => option.value === daysPerWeek
                )}
                required
              />
            </label>

            <label className='form-label'>
              Dietary restrictions
              <CreatableSelect
                className='form-select form-select--creatable'
                name='dietaryRestrictions'
                options={dietaryRestrictionsOptions}
                placeholder='Dietary restrictions'
                isCreatable={true}
                onChange={handleDietaryRestrictionsChange}
                value={{
                  label: dietaryRestrictions,
                  value: dietaryRestrictions,
                }} // <-- This line
              />
            </label>
          </div>
          <div className='line-group'>
            <label className='form-label'>
              Goals
              <br />
              <textarea
                className='form-textarea'
                name='goals'
                placeholder='Example: I am looking to lose 10 pounds over the next 30 days.'
                onChange={handleGoalsChange}
                value={goals}
                required
              />
            </label>
          </div>
        </fieldset>
        <button className='form-btn' type='submit'>
          Submit
        </button>
      </div>
    </>
  );
};

export default Form;
