import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInputForm from './components/UserInputForm';
import Navbar from './components/Navbar';
import SavedFitnessPlans from './components/SavedFitnessPlans';
import SavedDietPlans from './components/SavedDietPlans';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

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
        <Footer />
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </Router>
    </AuthProvider>
  );
};

export default App;
