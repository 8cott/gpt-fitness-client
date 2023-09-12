// Please review my code and provide step-by-step instructions on how I can make it so that when a user is logged in, the form fields will be automatically filled in with the data from the /users database. If not logged in, it will appear as it is currently. I will provide the relevant code from Form.jsx from the react frontend and models.py and routes.py from the backend. 

// Form.jsx:
// import { useState, useEffect } from 'react';
// import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';
// import { useAuth } from './AuthContext';
// import axiosInstance from './AxiosConfig';

// const Form = () => {
//   const { isLoggedIn, username } = useAuth();
//   const useFormField = (initialValue) => {
//     const [value, setValue] = useState(initialValue);
//     const handleChange = (selectedOption) => {
//       setValue(selectedOption.value);
//     };
//     return [value, handleChange];
//   };

//   const [sex, handleSexChange] = useFormField('');
//   const [age, handleAgeChange] = useFormField('');
//   const [feet, handleFeetChange] = useFormField('');
//   const [inches, handleInchesChange] = useFormField('');
//   const [weight, handleWeightChange] = useFormField('');
//   const [daysPerWeek, handleDaysPerWeekChange] = useFormField('');
//   const [dietaryRestrictions, handleDietaryRestrictionsChange] =
//     useFormField('none');
//   const [goals, handleGoalsChange] = useFormField('');

//   const sexOptions = [
//     { value: 'female', label: 'Female' },
//     { value: 'male', label: 'Male' },
//   ];

//   const ageOptions = [];
//   for (let age = 18; age <= 100; age++) {
//     ageOptions.push({ value: age, label: age.toString() });
//   }

//   const feetOptions = [];
//   for (let feet = 3; feet <= 7; feet++) {
//     feetOptions.push({ value: feet, label: feet.toString() });
//   }

//   const inchesOptions = [];
//   for (let inches = 0; inches <= 11; inches++) {
//     inchesOptions.push({ value: inches, label: inches.toString() });
//   }

//   const weightOptions = [];
//   for (let weight = 75; weight <= 350; weight++) {
//     weightOptions.push({ value: weight, label: weight.toString() });
//   }

//   const daysPerWeekOptions = [];
//   for (let daysPerWeek = 1; daysPerWeek <= 7; daysPerWeek++) {
//     daysPerWeekOptions.push({
//       value: daysPerWeek,
//       label: daysPerWeek.toString(),
//     });
//   }

//   const dietaryRestrictionsOptions = [
//     { value: 'none', label: 'None' },
//     { value: 'dairyFree', label: 'Dairy-free' },
//     { value: 'glutenFree', label: 'Gluten-free' },
//     { value: 'keto', label: 'Keto' },
//     { value: 'lactoseIntolerant', label: 'Lactose intolerant' },
//     { value: 'lowFODMAP', label: 'Low FODMAP' },
//     { value: 'paleo', label: 'Paleo' },
//     { value: 'pescatarian', label: 'Pescatarian' },
//     { value: 'primal', label: 'Primal' },
//     { value: 'vegan', label: 'Vegan' },
//     { value: 'vegetarian', label: 'Vegetarian' },
//     { value: 'whole30', label: 'Whole30' },
//   ];

//   return (
//     <>
//     <div className='form-container'>
//       <fieldset className='form-fieldset'>
//         <div className='line-group'>
//         <label className='form-label'>
//           Sex
//           <Select
//             className='form-select'
//             name='sex'
//             options={sexOptions}
//             placeholder='-- Select --'
//             isSearchable={false}
//             onChange={handleSexChange}
//             required
//           />
//         </label>

//         <label className='form-label'>
//           Age
//           <Select
//             className='form-select'
//             name='age'
//             options={ageOptions}
//             placeholder='-- Select --'
//             onChange={handleAgeChange}
//             required
//           />
//         </label>

//         <label className='form-label'>
//           Height
//           <div className='height-container'>
//           <Select
//             className='form-select form-select--feet'
//             name='feet'
//             options={feetOptions}
//             placeholder='Feet'
//             onChange={handleFeetChange}
//             required
//           />
//           <Select
//             className='form-select form-select--inches'
//             name='inches'
//             options={inchesOptions}
//             placeholder='Inches'
//             onChange={handleInchesChange}
//             required
//           />
//          </div>
//         </label>

//         <label className='form-label'>
//           Weight
//           <Select
//             className='form-select'
//             name='weight'
//             options={weightOptions}
//             placeholder='-- Select --'
//             onChange={handleWeightChange}
//             required
//           />
//         </label>
//         </div>
//         <div className='line-group'>
//         <label className='form-label'>
//           Days per week
//           <Select
//             className='form-select'
//             name='daysPerWeek'
//             options={daysPerWeekOptions}
//             placeholder='-- Select --'
//             onChange={handleDaysPerWeekChange}
//             required
//           />
//         </label>

//         <label className='form-label'>
//           Dietary restrictions
//           <CreatableSelect
//             className='form-select form-select--creatable'
//             name='dietaryRestrictions'
//             options={dietaryRestrictionsOptions}
//             placeholder='Dietary restrictions'
//             defaultValue={{ value: 'none', label: 'None' }}
//             isCreatable={true}
//             onChange={handleDietaryRestrictionsChange}
//           />
//         </label>
//         </div>
//         <div className='line-group'>
//         <label className='form-label'>
//           Goals
        
//         <br />
//           <textarea
//             className='form-textarea'
//             name='goals'
//             placeholder='Example: I am looking to lose 10 pounds over the next 30 days.'
//             onChange={handleGoalsChange}
//             required
//           />
//           </label>
//           </div>
//       </fieldset>
//       <button className='form-btn' type='submit'>
//         Submit
//       </button>
//     </div>
//     </>
//   );
// };

// export default Form;

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:5000',
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   console.log('Token:', token);
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default axiosInstance;

// Models.py:
// class User(db.Model):
//     __tablename__ = "users"
//     id = db.Column(db.Integer, primary_key=True)
//     username = db.Column(db.String(255), unique=True, nullable=False, index=True)
//     email = db.Column(db.String(255), unique=True, nullable=False, index=True)
//     age = db.Column(db.Integer)
//     sex = db.Column(db.String(255))
//     weight = db.Column(db.Float)
//     feet = db.Column(db.Integer)
//     inches = db.Column(db.Integer)
//     goals = db.Column(db.String(255))
//     days_per_week = db.Column(db.Integer)
//     dietary_restrictions = db.Column(db.String(255))
//     created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

// routes.py:

// @main_blueprint.route("/users", methods=["POST"])
// def signup():
//     data = request.get_json()

//     username = data.get("username")
//     email = data.get("email")
//     password = data.get("password")

//     # Check for missing fields
//     if not all([username, email, password]):
//         return error_response(400, "Missing Fields!")

//     # Validate the password
//     if not is_valid_password(password):
//         return error_response(400, "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a digit")

//     # Check if the username or email already exists
//     if User.query.filter_by(username=username).first():
//         return error_response(400, "Username already exists!")
//     if User.query.filter_by(email=email).first():
//         return error_response(400, "Email already exists!")

//     new_user = User(
//         username=data["username"],
//         email=data["email"],
//         age=data.get("age"),
//         sex=data.get("sex"),
//         weight=data.get("weight"),
//         feet=data.get("feet"),
//         inches=data.get("inches"),
//         goals=data.get("goals"),
//         days_per_week=data.get("days_per_week"),
//         dietary_restrictions=data.get("dietary_restrictions")
//     )
//     new_user.set_password(data["password"])

//     db.session.add(new_user)
//     db.session.commit()
//     return jsonify({"message": "User created successfully!"}), 201
    
// routes.py:

// # Get User Route
// @main_blueprint.route("/users/<int:user_id>", methods=["GET"])
// @jwt_required()
// def get_user(user_id):
//     user = User.query.get_or_404(user_id)
//     return jsonify({
//         "id": user.id,
//         "username": user.username,
//         "email": user.email,
//         "age": user.age,
//         "sex": user.sex,
//         "weight": user.weight,
//         "feet": user.feet,
//         "inches": user.inches,
//         "goals": user.goals,
//         "days_per_week": user.days_per_week,
//         "dietary_restrictions": user.dietary_restrictions,
//     })

//     @main_blueprint.route("/users", methods=["POST"])
//     def signup():
//         data = request.get_json()
    
//         username = data.get("username")
//         email = data.get("email")
//         password = data.get("password")
    
//         # Check for missing fields
//         if not all([username, email, password]):
//             return error_response(400, "Missing Fields!")
    
//         # Validate the password
//         if not is_valid_password(password):
//             return error_response(400, "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a digit")
    
//         # Check if the username or email already exists
//         if User.query.filter_by(username=username).first():
//             return error_response(400, "Username already exists!")
//         if User.query.filter_by(email=email).first():
//             return error_response(400, "Email already exists!")
    
//         new_user = User(
//             username=data["username"],
//             email=data["email"],
//             age=data.get("age"),
//             sex=data.get("sex"),
//             weight=data.get("weight"),
//             feet=data.get("feet"),
//             inches=data.get("inches"),
//             goals=data.get("goals"),
//             days_per_week=data.get("days_per_week"),
//             dietary_restrictions=data.get("dietary_restrictions")
//         )
//         new_user.set_password(data["password"])
    
//         db.session.add(new_user)
//         db.session.commit()
//         return jsonify({"message": "User created successfully!"}), 201
    
    
//     # Get User Route
//     @main_blueprint.route("/users/<string:username>", methods=["GET"])
//     @jwt_required()
//     def get_user(username):
//         auth_header = request.headers.get('Authorization')
//         print("Received Authorization Header:", auth_header)
//         print("Endpoint '/users/' hit. Fetching data for:", username)
//         user = User.query.filter_by(username=username).first_or_404()
//         print("Queried user data:", user)
//         return jsonify({
//             "id": user.id,
//             "username": user.username,
//             "email": user.email,
//             "age": user.age,
//             "sex": user.sex,
//             "weight": user.weight,
//             "feet": user.feet,
//             "inches": user.inches,
//             "goals": user.goals,
//             "days_per_week": user.days_per_week,
//             "dietary_restrictions": user.dietary_restrictions,
//         })
    