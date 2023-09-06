
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext, useEffect } from 'react';
import { UserContext } from './context/UseContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const {user, loginContext} = useContext(UserContext)

  useEffect(()=>{
     if(localStorage.getItem('token')){
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
     }
  },[])

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className='app-container'>
        <Header />
        <Container>
          <AppRoutes/>
        </Container>

      </div>
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
        theme="light"
      />
    </>
  );
}

export default App;
