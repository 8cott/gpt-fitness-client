import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInputForm from './components/UserInputForm'
import Navbar from './components/Navbar'
import DisplaySavedPlan from './components/DisplaySavedPlan';
import { AuthProvider } from './components/AuthContext'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<UserInputForm />} />
          <Route path='/saved-plans' element={<DisplaySavedPlan />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
