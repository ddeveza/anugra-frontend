// import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';

// this import is for crud
import Crud from '../crud/Crud';

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <div>
        <h1>Not Authenticated</h1>
        <h2>Kindly loigin here!</h2>
        <Link to='/'>
          <button type='button' className={styles.white_btn}>
            Sing in
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Masih.com</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <h1>Welcom to world of masih</h1>
      <hr />
      <Crud />
    </div>
  );
};

export default Main;
