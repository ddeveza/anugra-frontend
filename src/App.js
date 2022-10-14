import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Main from './components/Main';
import Signup from './components/Signup';

function App() {
  //const user = localStorage.getItem("token");

  return (
    <>
      <ToastContainer position='top-right' limit={1} />
      <Routes>
        <Route path='/main' element={<Main />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
      </Routes>
    </>
  );
}

export default App;
