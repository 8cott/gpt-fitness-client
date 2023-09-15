import UserInputForm from './components/UserInputForm'
import Navbar from './components/Navbar'
import { AuthProvider } from './components/AuthContext'
import './App.css'

const App = () => {

  return (
    <AuthProvider>
      <Navbar />
      <UserInputForm />
    </AuthProvider>
  )
}

export default App