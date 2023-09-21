import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInputForm from './components/UserInputForm'
import Navbar from './components/Navbar'
import { AuthProvider } from './components/AuthContext'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserInputForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
