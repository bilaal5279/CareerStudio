import React, {useState} from 'react';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import Register from '../components/Register';



function LoginForm() {
  const [currentForm, setCurrentForm] = useState('Login')
  const toggleForm = (formName) => {
    setCurrentForm(formName);


  }
  return (
    <div className='auth-form'>
      <NavBar />
      {currentForm === 'Login' ?  <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
    </div>
  );
}

  export default LoginForm;