import Form from './components/Form'
import Navbar from './components/Navbar'
import { AuthProvider } from './components/AuthContext'
import './App.css'

const App = () => {

  return (
    <AuthProvider>
      <Navbar />
      <Form />
    </AuthProvider>
  )
}

export default App