import './App.css';
import Login from './Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapPage from './Pages/MapPage/MapPage';
import DiceContext from './Contexts/DiceContext';
import LoginDataContext from './Contexts/LoginDataContext';
import PawnContext from './Contexts/PawnContext';
import SocketContext from './Contexts/SocketContext';
import Register from './Pages/Login/Register';
import LandingPage from './Pages/LandingPage/LandingPage';
function App() {
  return (
    <div>
      <LoginDataContext>
        <PawnContext>
          <Routes>
            <Route exact path="/" Component={Login} />
            <Route exact path='/map' element={<DiceContext><MapPage /></DiceContext>} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/landing-page' element={<LandingPage />} />
          </Routes>
        </PawnContext>
      </LoginDataContext>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;