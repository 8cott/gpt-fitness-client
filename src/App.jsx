import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInputForm from './components/UserInputForm'
import Navbar from './components/Navbar'
import SavedFitnessPlans from './components/SavedFitnessPlans';
import SavedDietPlans from './components/SavedDietPlans';
import { AuthProvider } from './components/AuthContext'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<UserInputForm />} />
          <Route path='/saved-fitness-plans' element={<SavedFitnessPlans />} />
          <Route path='/saved-diet-plans' element={<SavedDietPlans />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
